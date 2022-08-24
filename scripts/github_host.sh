#!/bin/sh

# For chinese users
/bin/sed -i "/# GitHub520 Host Start/Q" /etc/hosts && /bin/curl https://raw.hellogithub.com/hosts >>/etc/hosts
