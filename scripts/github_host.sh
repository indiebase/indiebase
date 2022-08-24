#!/bin/sh

# For chinese users
/bin/sed -i "/# Hosts Start/Q" /etc/hosts && /bin/curl https://raw.githubusercontent.com/JohyC/Hosts/main/GithubHosts.txt >>/etc/hosts
