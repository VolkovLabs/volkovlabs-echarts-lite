import { PanelPlugin } from '@grafana/data';
import { EChartsEditor, EChartsPanel } from './components';
import { DefaultOptions, FormatOptions, RendererOptions } from './constants';
import { PanelOptions } from './types';

/**
 * Panel Plugin
 */
export const plugin = new PanelPlugin<PanelOptions>(EChartsPanel)
  .setNoPadding()
  .setPanelOptions((builder) => {
    builder
      .addRadio({
        path: 'renderer',
        name: 'Renderer',
        settings: {
          options: RendererOptions,
        },
        defaultValue: DefaultOptions.renderer,
      });

    /**
     * Editor
     */
    builder
      .addSliderInput({
        path: 'editor.height',
        name: 'Height, px',
        defaultValue: DefaultOptions.editor.height,
        settings: {
          min: 100,
          max: 2000,
        },
        category: ['Editor'],
      })
      .addRadio({
        path: 'editor.format',
        name: 'Formatting',
        settings: {
          options: FormatOptions,
        },
        defaultValue: DefaultOptions.editor.format,
        category: ['Editor'],
      })
      .addCustomEditor({
        id: 'getOption',
        path: 'getOption',
        name: 'Function',
        description: 'Should return parameters and data for setOptions().',
        defaultValue: DefaultOptions.getOption,
        editor: EChartsEditor,
        category: ['Editor'],
      });

    return builder;
  })
  .setDataSupport({
    annotations: true,
    alertStates: true,
  });
