---
sidebar_position: 1
id: network-infra-overview
title: "Network Overview"
description: "Network Overview - Network Infrastructure"
---

# Network Infrastructure Overview

## Network Topology

CodeTechSolutions operates a multi-site network architecture connecting our Budapest headquarters with cloud infrastructure across Europe.

### Core Components

- **Firewall**: pfSense cluster (HA pair)
- **Core Switch**: Cisco Catalyst 9300 stack
- **Access Points**: Ubiquiti UniFi AP-Pro
- **VPN**: WireGuard site-to-site tunnels

### Network Segments

| VLAN | Name | Subnet | Purpose |
|------|------|--------|---------|
| 10 | Management | 10.0.10.0/24 | Network device management |
| 20 | Servers | 10.0.20.0/24 | Production servers |
| 30 | Development | 10.0.30.0/24 | Developer workstations |
| 40 | Guest | 10.0.40.0/24 | Guest WiFi (isolated) |

### Monitoring

All network devices are monitored via **Zabbix** with alerts sent to the Operations team Slack channel.
