---
sidebar_position: 2
id: network-infra-vpn-guide
title: "VPN Access Guide"
description: "VPN Access Guide - Network Infrastructure"
---

# VPN Access Guide

## Prerequisites

- WireGuard client installed on your device
- VPN configuration file from IT (request via Helpdesk)
- Multi-factor authentication (MFA) enabled on your account

## Setup Instructions

### Windows / macOS

1. Install WireGuard from [wireguard.com](https://www.wireguard.com/install/)
2. Open WireGuard and click **Import tunnel(s) from file**
3. Select the `.conf` file provided by IT
4. Click **Activate**

### Linux

```bash
sudo apt install wireguard
sudo cp codetechsolutions.conf /etc/wireguard/
sudo wg-quick up codetechsolutions
```

## Troubleshooting

- **Cannot connect**: Verify your MFA token is current
- **Slow connection**: Try switching to the nearest endpoint
- **DNS issues**: Ensure your DNS is set to `10.0.10.1`

For further assistance, contact the Helpdesk team.
