import { Renderer } from '../constants';
import { EditorOptions } from './editor';

/**
 * Options
 */
export interface PanelOptions {
  /**
   * Renderer
   *
   * @type {Renderer}
   */
  renderer: Renderer;

  /**
   * Option
   *
   * @type {string}
   */
  getOption: string;

  /**
   * Editor
   *
   * @type {EditorOptions}
   */
  editor: EditorOptions;
}
