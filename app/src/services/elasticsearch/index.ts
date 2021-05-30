import { Texts } from "@models/Text";
import { Client } from '@elastic/elasticsearch'
import { config } from "@environments/config";
const client = new Client({
    node: config.elastic.url!
})

export async function mapping() {
    // If the mapping exist, pass! Else, we create a new mapping.
    const { body } = await client.indices.exists({ index: "texts" })

    console.log("Index exist?", body);

    if (!body) {
        (Texts as any).createMapping({
            "settings": {
                "index": {
                    "number_of_shards": 1,
                    "elastiknn": true,
                    "analysis": {
                        "analyzer": {
                            "htmlStripAnalyzer": {
                                "type": "custom",
                                "tokenizer": "custom_tokenizer",
                                "char_filter": [
                                    "html_strip"
                                ]
                            }
                        },
                        "tokenizer": {
                            "custom_tokenizer": {
                                "type": "ngram",
                                "token_chars": [
                                    "letter",
                                    // "digit",
                                    "symbol",
                                    "punctuation"
                                ]
                            }
                        }
                    },
                }
            },
            "mappings": {
                "properties": {
                    "title": {
                        "properties": {
                            "fr": {
                                "type": "text",
                                "fields": {
                                    "keyword": {
                                        "type": "keyword",
                                        "ignore_above": 256
                                    }
                                }
                            }
                        },
                    },
                    "vector": {
                        "type": "elastiknn_dense_float_vector",
                        "elastiknn": {
                            "dims": 768,
                            // "model": "permutation_lsh",
                            // "similarity": "angular",
                            // "k": 10,
                        }
                    },
                    "cleanContent": {
                        "properties": {
                            "fr": {
                                "type": "text",
                                "fields": {
                                    "keyword": {
                                        "type": "keyword",
                                        "ignore_above": 256
                                    }
                                }
                            }
                        },
                    },
                }
            }
        }, function (err: any, mapping: any) {
            if (err) {
                console.error(err);
            } else {
                console.log("mapping done!");
            }
        });
    }
}