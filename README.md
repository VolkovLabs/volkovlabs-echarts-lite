# Apache ECharts Lite Panel for Grafana

![ECharts](https://github.com/VolkovLabs/volkovlabs-echarts-lite/raw/main/src/img/dashboard.png)

[![Grafana](https://img.shields.io/badge/Grafana-9.4.7-orange)](https://www.grafana.com)
[![YouTube](https://img.shields.io/badge/YouTube-Playlist-red)](https://youtube.com/playlist?list=PLPow72ygztmQHGWFqksEf3LebUfhqBfFu)
![CI](https://github.com/volkovlabs/volkovlabs-echarts-lite/workflows/CI/badge.svg)

## Introduction

The Apache ECharts Lite plugin is a visualization panel for Grafana that allows you to incorporate the popular Apache ECharts library into your Grafana dashboard.  It's a fork of the Apache ECharts panel which provides only Core functionality without maps and extensions.

[Apache ECharts](https://echarts.apache.org/en/index.html) is a free, powerful charting and visualization library with statistical capabilities. It is written in pure JavaScript and based on zrender.

[![Apache ECharts panel for Grafana | How to create modern dashboards in Grafana | ECharts Tutorial](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/video.png)](https://youtu.be/DxqCrBEmrQw)

Apache ECharts visualization panel offers an easy way of adding intuitive, interactive, and highly customizable charts into your Grafana dashboard.

### Requirements

- **Grafana 8.5+, Grafana 9.0+** is required.

## Getting Started

The Apache ECharts Lite panel is not included in the Grafana Catalog. It can be downloaded directly from GitHub.

## Features

- Provides Monaco Code Editor for:
  - Working with Grafana data frames (JavaScript),
  - Updating chart configurations in JSON format.
- Supports Code Auto formatting.
- Executes the `setOption()` function using Monaco Code Editor content.
- Supports variables and location service to make Charts interactive.
- Based on the ECharts 5.4.2.
- Supports Light and Dark modes synchronized with Grafana Theme.
- Supports SVG and Canvas renderers.
- Supports Code Editor suggestions for Parameters and variables.
- Allows displaying Success and Error notifications.
- Supports real-time data updates using streaming Data Sources and Grafana Live.
- Has 100+ ready-as-is examples at [echarts.volkovlabs.io](https://echarts.volkovlabs.io).

## Documentation

| Section                     | Description                                                         |
| --------------------------- | ------------------------------------------------------------------- |
| [ECharts Function](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/options/) | Explains how to configure the main Apache ECharts library function. |
| [Examples](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/examples/)        | Explains how to get started with ECharts Examples.                  |
| [Release Notes](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/release/)    | Stay up to date with the latest features and updates.               |

## Feedback

We love to hear from you. There are various ways to get in touch with us:

- Ask a question, request a new feature, and file a bug with [GitHub issues](https://github.com/volkovlabs/volkovlabs-echarts-lite/issues/new/choose).
- Sponsor our open-source plugins for Grafana with [GitHub Sponsor](https://github.com/sponsors/VolkovLabs).
- Star the repository to show your support.

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-echarts-lite/blob/main/LICENSE).
