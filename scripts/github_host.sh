#!/bin/sh

# For chinese users
0 */6 * * * /bin/sed -i "/# Hosts Start/Q" /etc/hosts && /bin/curl https://raw.githubusercontent.com/JohyC/Hosts/main/GithubHosts.txt >>/etc/hosts
