FROM alpine:3.22
RUN apk add --no-cache bash curl iputils net-snmp-tools && addgroup -S nocx && adduser -S -G nocx nocx
COPY collector.sh /usr/local/bin/collector.sh
RUN chmod 0555 /usr/local/bin/collector.sh && mkdir -p /var/lib/nocx/spool && chown -R nocx:nocx /var/lib/nocx
USER nocx
ENTRYPOINT ["/usr/local/bin/collector.sh"]
