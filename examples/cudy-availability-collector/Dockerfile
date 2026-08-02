FROM alpine:3.22
RUN apk add --no-cache ca-certificates curl iputils jq wireguard-tools
COPY collector.sh /usr/local/bin/nocx-collector
RUN chmod 0555 /usr/local/bin/nocx-collector
USER 65532:65532
ENTRYPOINT ["/usr/local/bin/nocx-collector"]
