# Apache ECharts Lite Panel for Grafana

![ECharts](https://github.com/VolkovLabs/volkovlabs-echarts-lite/raw/main/src/img/dashboard.png)

![Grafana](https://img.shields.io/badge/Grafana-9.5.2-orange)
[![YouTube](https://img.shields.io/badge/YouTube-Playlist-red)](https://youtube.com/playlist?list=PLPow72ygztmQHGWFqksEf3LebUfhqBfFu)
![CI](https://github.com/volkovlabs/volkovlabs-echarts-lite/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/VolkovLabs/volkovlabs-echarts-lite/branch/main/graph/badge.svg)](https://codecov.io/gh/VolkovLabs/volkovlabs-echarts-lite)
[![CodeQL](https://github.com/VolkovLabs/volkovlabs-echarts-lite/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/VolkovLabs/volkovlabs-echarts-lite/actions/workflows/codeql-analysis.yml)

## Introduction

The Apache ECharts Lite plugin is a fork of the Apache ECharts panel that provides only Core functionality without maps and extensions. It's designed to use in Application plugins and IoT projects.

[Apache ECharts](https://echarts.apache.org/en/index.html) is a free, powerful charting and visualization library with statistical capabilities. It is written in pure JavaScript and based on zrender.

[![Apache ECharts panel for Grafana | How to create modern dashboards in Grafana | ECharts Tutorial](https://raw.githubusercontent.com/volkovlabs/volkovlabs-echarts-panel/main/img/video.png)](https://youtu.be/DxqCrBEmrQw)

Apache ECharts visualization panel offers an easy way of adding intuitive, interactive, and highly customizable charts into your Grafana dashboard.

### Requirements

- **Grafana 8.5+, Grafana 9.0+** is required.

## Getting Started

The Apache ECharts Lite panel can be downloaded directly from the GitHub repository.

## Highlights

- Provides Monaco Code Editor for:
  - Working with Grafana data frames (JavaScript),
  - Updating chart configurations in JSON format.
- Executes the `setOption()` function using Monaco Code Editor content.
- Supports variables and location service to make Charts interactive.
- Based on the ECharts 5.4.2.
- Supports Light and Dark modes synchronized with Grafana Theme.
- Supports SVG and Canvas renderers.
- Supports Code Editor suggestions for Parameters and variables.
- Supports real-time data updates using streaming Data Sources and Grafana Live.

## Documentation

| Section                     | Description                                                         |
| --------------------------- | ------------------------------------------------------------------- |
| [ECharts Function](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/options/) | Explains how to configure the main Apache ECharts library function. |
| [Examples](https://volkovlabs.io/plugins/volkovlabs-echarts-panel/examples/)        | Explains how to get started with ECharts Examples.                  |
| [Release Notes](https://volkovlabs.io/plugins/volkovlabs-echarts-lite/release/)    | Stay up to date with the latest features and updates.               |

## Support

We provide GitHub Discussions and Premium tier support for the development and private plugins available via [GitHub Sponsor](https://github.com/sponsors/VolkovLabs).

## License

Apache License Version 2.0, see [LICENSE](https://github.com/volkovlabs/volkovlabs-echarts-lite/blob/main/LICENSE).
