FROM alpine:3.22
RUN apk add --no-cache net-snmp-tools python3 iputils && addgroup -S -g 65532 nocx && adduser -S -D -H -u 65532 -G nocx nocx
COPY collector.py /opt/nocx/collector.py
RUN chmod 0555 /opt/nocx/collector.py && mkdir -p /var/lib/nocx/spool && chown -R nocx:nocx /var/lib/nocx
USER 65532:65532
ENTRYPOINT ["python3","/opt/nocx/collector.py"]
