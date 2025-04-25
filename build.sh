#!/bin/bash
date=$(date +"%Y-%m-%d")
rm -f releases/sigeva-json-*.zip
cd src && zip -r ../releases/sigeva-json-${date}.zip *