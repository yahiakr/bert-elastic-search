FROM docker.elastic.co/elasticsearch/elasticsearch:7.12.1

RUN elasticsearch-plugin install --batch https://github.com/alexklibisz/elastiknn/releases/download/7.12.1.0/elastiknn-7.12.1.0.zip

USER root

RUN chown elasticsearch:elasticsearch /usr/share/elasticsearch/data

USER elasticsearch

EXPOSE 9200

# docker run -p 9200:9200 -e "discovery.type=single-node" elastiknn-example