import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';
import { css, cx } from '@emotion/css';
import { AlertErrorPayload, AlertPayload, AppEvents, LoadingState, PanelProps } from '@grafana/data';
import { getAppEvents, locationService } from '@grafana/runtime';
import { Alert, useStyles2, useTheme2 } from '@grafana/ui';
import { TestIds } from '../../constants';
import { Styles } from '../../styles';
import { CodeResult, PanelOptions } from '../../types';

/**
 * Properties
 */
interface Props extends PanelProps<PanelOptions> {}

/**
 * Panel
 */
export const EChartsPanel: React.FC<Props> = ({ options, data, width, height, replaceVariables, eventBus }) => {
  /**
   * Reference
   */
  const echartRef = useRef<HTMLDivElement>(null);

  /**
   * States
   */
  const [chart, setChart] = useState<echarts.ECharts>();
  const [error, setError] = useState<Error | undefined>();

  /**
   * Styles and Theme
   */
  const theme = useTheme2();
  const styles = useStyles2(Styles);

  /**
   * Events
   */
  const appEvents = getAppEvents();
  const notifySuccess = (payload: AlertPayload) => appEvents.publish({ type: AppEvents.alertSuccess.name, payload });
  const notifyError = (payload: AlertErrorPayload) => appEvents.publish({ type: AppEvents.alertError.name, payload });

  /**
   * Initialize Chart
   */
  const initChart = () => {
    if (!echartRef.current) {
      return;
    }

    /**
     * Clear and dispose old chart
     */
    if (chart) {
      chart.clear();
      chart.dispose();
    }

    /**
     * Theme
     */
    const echartsTheme = theme.isDark ? 'dark' : undefined;

    setChart(echarts.init(echartRef.current, echartsTheme, { renderer: options.renderer }));
  };

  /**
   * Initialize chart if Render updated
   */
  useEffect(() => {
    initChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.renderer]);

  /**
   * Resize
   */
  useEffect(() => {
    chart?.resize();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  /**
   * Execute EChart Function
   */
  useEffect(() => {
    /**
     * Unsubscribe Function
     */
    let unsubscribeFn = () => {};

    /**
     * Skip if chart is not defined
     */
    if (!chart) {
      return unsubscribeFn;
    }

    /**
     * Re-initialize on Restore
     * We have to unsubscribe first to prevent memory leaks
     */
    chart.off('restore');
    chart.on('restore', () => {
      initChart();
    });

    /**
     * Wait until Data Source return results
     */
    if (data.state && ![LoadingState.Done, LoadingState.Streaming].includes(data.state)) {
      return unsubscribeFn;
    }

    /**
     * Remove error
     */
    setError(undefined);

    /**
     * Execution Function
     */
    try {
      const func = new Function(
        'data',
        'theme',
        'echartsInstance',
        'echarts',
        'replaceVariables',
        'eventBus',
        'locationService',
        'notifySuccess',
        'notifyError',
        options.getOption
      );

      /**
       * Code Result
       */
      const codeResult: CodeResult = func(
        data,
        theme,
        chart,
        echarts,
        replaceVariables,
        eventBus,
        locationService,
        notifySuccess,
        notifyError
      );

      /**
       * Chart option
       */
      let chartOption = {};

      /**
       * Default Option Config with merge disabled
       */
      let chartOptionConfig: echarts.EChartsOptionConfig = {
        notMerge: true,
      };

      /**
       * Check version
       */
      if (codeResult && 'version' in codeResult && codeResult.version === 2) {
        /**
         * Handle result v2
         */
        chartOption = codeResult.option || {};
        chartOptionConfig = codeResult.config || chartOptionConfig;

        /**
         * Set Unsubscribe Function
         */
        const unsubscribeFunction = codeResult.unsubscribe;
        if (typeof unsubscribeFunction === 'function') {
          unsubscribeFn = () => {
            unsubscribeFunction();
          };
        }
      } else {
        /**
         * Handle result v1
         */
        chartOption = codeResult || {};
      }

      /**
       * Set Options
       */
      chart.setOption(
        {
          backgroundColor: 'transparent',
          ...chartOption,
        },
        chartOptionConfig
      );
    } catch (err) {
      setError(err as any);
    }

    return unsubscribeFn;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart, options.getOption, data]);

  /**
   * EChart
   */
  return (
    <>
      {error?.message && (
        <Alert data-testid={TestIds.panel.error} severity="warning" title="ECharts Execution Error">
          {error.message}
        </Alert>
      )}

      {error?.stack && <pre>{error.stack}</pre>}

      <div
        ref={echartRef}
        className={cx(
          styles.wrapper,
          css`
            width: ${width}px;
            height: ${height}px;
          `
        )}
        data-testid={TestIds.panel.chart}
      />
    </>
  );
};
