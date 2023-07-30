import * as echarts from 'echarts';
import React from 'react';
import { AlertErrorPayload, AlertPayload, AppEvents, LoadingState, toDataFrame } from '@grafana/data';
import { getAppEvents } from '@grafana/runtime';
import { render, screen } from '@testing-library/react';
import { TestIds } from '../../constants';
import { EChartsPanel } from './EChartsPanel';

/**
 * Mock ECharts
 */
jest.mock('echarts', () => ({
  init: jest.fn(),
  registerTheme: jest.fn(),
}));

/**
 * Mock @grafana/runtime
 */
jest.mock('@grafana/runtime', () => ({
  getAppEvents: jest.fn(),
}));

/**
 * Panel
 */
describe('Panel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Get Test Data
   */
  const getTestData = (state?: LoadingState) => {
    return {
      state,
      series: [
        toDataFrame({
          name: 'data',
          fields: [],
        }),
      ],
    };
  };

  /**
   * Get Tested Component
   */
  const getComponent = ({ options = { name: 'data' }, ...restProps }: any, state?: LoadingState) => {
    return (
      <EChartsPanel
        data={getTestData(state)}
        {...restProps}
        options={{
          themeEditor: {},
          ...options,
        }}
      />
    );
  };

  it('Should find component', async () => {
    render(getComponent({}));
    expect(screen.getByTestId(TestIds.panel.chart)).toBeInTheDocument();
  });

  it('Should find component with Done state', async () => {
    render(getComponent({}, LoadingState.Done));
    expect(screen.getByTestId(TestIds.panel.chart)).toBeInTheDocument();
  });

  it('Should find component for Streaming', async () => {
    render(getComponent({}, LoadingState.Streaming));
    expect(screen.getByTestId(TestIds.panel.chart)).toBeInTheDocument();
  });

  it('Should call echart.init with appropriated parameters', () => {
    const renderer = jest.fn();
    render(getComponent({ options: { renderer } }));
    expect(echarts.init).toHaveBeenCalledWith(screen.getByTestId(TestIds.panel.chart), 'dark', { renderer });
  });

  /**
   * Events
   */
  it('Should publish success and errors events with passed payload', () => {
    const publish = jest.fn();
    jest.mocked(getAppEvents).mockImplementation(
      () =>
        ({
          publish,
        }) as any
    ); // we need only these options

    const successPayload: AlertPayload = ['everything is fine'];
    const errorPayload: AlertErrorPayload = ['something is wrong'];
    jest.mocked(echarts.init).mockImplementationOnce(
      () =>
        ({
          setOption: ({
            notifySuccess,
            notifyError,
          }: {
            notifySuccess: (payload: AlertPayload) => void;
            notifyError: (payload: AlertErrorPayload) => void;
          }) => {
            notifySuccess(successPayload);
            notifyError(errorPayload);
          },
          on: jest.fn(),
          clear: jest.fn(),
        }) as any
    ); // we need only these options

    render(getComponent({ options: { getOption: 'return { notifySuccess, notifyError }' } }));
    expect(publish).toHaveBeenCalledWith({
      type: AppEvents.alertSuccess.name,
      payload: successPayload,
    });
    expect(publish).toHaveBeenCalledWith({
      type: AppEvents.alertError.name,
      payload: errorPayload,
    });
  });

  /**
   * Chart updates section
   */
  describe('Chart updates', () => {
    const clearChart = jest.fn();
    const disposeChart = jest.fn();
    const resizeChart = jest.fn();

    beforeEach(() => {
      jest.mocked(echarts.init).mockImplementation(
        () =>
          ({
            on: jest.fn(),
            clear: clearChart,
            dispose: disposeChart,
            resize: resizeChart,
          }) as any
      ); // we need only these options
    });

    it('Should clear and update if options.renderer is changed', () => {
      const { rerender } = render(getComponent({ options: { renderer: jest.fn() } }));
      jest.mocked(echarts.init).mockClear();
      // check if calls were cleared
      expect(echarts.init).not.toHaveBeenCalled();
      // re-render component
      rerender(getComponent({ options: { renderer: jest.fn() } }));
      expect(clearChart).toHaveBeenCalled();
      expect(disposeChart).toHaveBeenCalled();
      expect(echarts.init).toHaveBeenCalledTimes(1);
    });

    it('Should resize chart if width is changed', () => {
      const { rerender } = render(getComponent({ width: 100 }));
      resizeChart.mockClear();
      expect(resizeChart).not.toHaveBeenCalled();
      rerender(getComponent({ width: 120 }));
      expect(resizeChart).toHaveBeenCalled();
    });

    it('Should resize chart if height is changed', () => {
      const { rerender } = render(getComponent({ height: 100 }));
      resizeChart.mockClear();
      expect(resizeChart).not.toHaveBeenCalled();
      rerender(getComponent({ height: 120 }));
      expect(resizeChart).toHaveBeenCalled();
    });
  });

  describe('Code Execution', () => {
    it('Should apply result for v1 result', () => {
      const getOption = `
        return {
          series: []
        }
      `;
      const setOptionMock = jest.fn();
      jest.mocked(echarts.init).mockImplementation(
        () =>
          ({
            setOption: setOptionMock,
            on: jest.fn(),
          }) as any
      );
      render(getComponent({ options: { getOption } }));

      expect(setOptionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          series: [],
        }),
        { notMerge: true }
      );
    });

    it('Should apply result for v2 result', () => {
      const getOption = `
        return {
          version: 2,
          option: {
            series: []
          }
        }
      `;
      const setOptionMock = jest.fn();
      jest.mocked(echarts.init).mockImplementation(
        () =>
          ({
            setOption: setOptionMock,
            on: jest.fn(),
          }) as any
      );
      render(getComponent({ options: { getOption } }));

      expect(setOptionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          series: [],
        }),
        { notMerge: true }
      );
    });

    it('Should apply empty result for v2 result', () => {
      const getOption = `
        return {
          version: 2,
          option: null,
        }
      `;
      const setOptionMock = jest.fn();
      jest.mocked(echarts.init).mockImplementation(
        () =>
          ({
            setOption: setOptionMock,
            on: jest.fn(),
          }) as any
      );
      render(getComponent({ options: { getOption } }));

      expect(setOptionMock).toHaveBeenCalledWith(expect.objectContaining({}), { notMerge: true });
    });

    it('Should call unsubscribeFunction for v2 result', () => {
      const unsubscribe = jest.fn();
      const eventBus = {
        subscribe: jest.fn(() => ({
          unsubscribe,
        })),
      };
      const getOption = `
        const subscription = eventBus.subscribe();
        return {
          version: 2,
          option: {
            series: []
          },
          unsubscribe: () => {
            subscription.unsubscribe();
          }
        }
      `;
      const { rerender } = render(getComponent({ options: { getOption }, eventBus }));

      rerender(getComponent({ options: { getOption }, eventBus }));

      expect(unsubscribe).toHaveBeenCalled();
    });
  });
});
