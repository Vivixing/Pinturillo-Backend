// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = 
  {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Pinturillo Game API",
        version: "0.1.0",
        description:
          "This is a simulation of game Pinturillo made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Apl",
        },
      },
      paths: {
        "/palabras": {
          "get": {
            "summary": "Retrieve the list of words",
            "tags": ["Palabra"],
            "responses": {
              "200": {
                "description": "A word object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "palabra": {
                          "type": "object",
                          "properties": {
                            "idPalabra": {
                              "type": "string"
                            },
                            "texto": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the word could not be retrieved",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/palabras/:id":{
          "get": {
            "summary": "Retrieve the word by id",
            "tags": ["Palabra"],
            "parameters": [
              {
                "in": "query",
                "name": "idPalabra",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the word to retrieve"
              }
            ],
            "responses": {
              "200": {
                "description": "A word object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "palabra": {
                          "type": "object",
                          "properties": {
                            "idPalabra": {
                              "type": "string"
                            },
                            "texto": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the id of the word could not be retrieved",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Error message if the id of the word does not exist",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/palabra/:texto":{
          "get": {
            "summary": "Retrieve the word by text",
            "tags": ["Palabra"],
            "parameters": [
              {
                "in": "query",
                "name": "texto",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The text of the word to retrieve"
              }
            ],
            "responses": {
              "200": {
                "description": "A word object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "palabra": {
                          "type": "object",
                          "properties": {
                            "idPalabra": {
                              "type": "string"
                            },
                            "texto": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the text of the word could not be retrieved",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/palabra":{
          "post": {
            "summary": "Create a word",
            "tags": ["Palabra"],
            "parameters": [
              {
                "in": "query",
                "name": "idPalabra",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the word to create"
              },
              {
                "in": "query",
                "name": "texto",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The text of the word to create"
              }
            ],
            "responses": {
              "200": {
                "description": "A word object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "palabra": {
                          "type": "object",
                          "properties": {
                            "idPalabra": {
                              "type": "string"
                            },
                            "texto": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the word could not be created",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/palabra":{
          "put": {
            "summary": "Update a word",
            "tags": ["Palabra"],
            "parameters": [
              {
                "in": "query",
                "name": "idPalabra",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the word to update"
              },
              {
                "in": "query",
                "name": "texto",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The text of the word to update"
              }
            ],
            "responses": {
              "200": {
                "description": "A word object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "palabra": {
                          "type": "object",
                          "properties": {
                            "idPalabra": {
                              "type": "string"
                            },
                            "texto": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the word could not be updated",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/palabra/:id":{
          "delete": {
            "summary": "Delete a word",
            "tags": ["Palabra"],
            "parameters": [
              {
                "in": "query",
                "name": "idPalabra",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the word to delete"
              }
            ],
            "responses": {
              "200": {
                "description": "Message that the word has been deleted successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "message": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the word could not be deleted",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/categorias": {
          "get": {
            "summary": "Retrieve the list of categories",
            "tags": ["Categoria"],
            "responses": {
              "200": {
                "description": "A category object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "categoria": {
                          "type": "object",
                          "properties": {
                            "idCategoria": {
                              "type": "string"
                            },
                            "nombre": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the category could not be retrieved",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/categoria/:id":{
          "get": {
            "summary": "Retrieve the category by id",
            "tags": ["Categoria"],
            "parameters": [
              {
                "in": "query",
                "name": "idCategoria",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the category to retrieve"
              }
            ],
            "responses": {
              "200": {
                "description": "A category object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "categoria": {
                          "type": "object",
                          "properties": {
                            "idCategoria": {
                              "type": "string"
                            },
                            "nombre": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the id of the category could not be retrieved",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Error message if the id of the category does not exist",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/categoria/:nombre":{
          "get": {
            "summary": "Retrieve the category by name",
            "tags": ["Categoria"],
            "parameters": [
              {
                "in": "query",
                "name": "nombre",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The name of the category to retrieve"
              }
            ],
            "responses": {
              "200": {
                "description": "A category object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "categoria": {
                          "type": "object",
                          "properties": {
                            "idCategoria": {
                              "type": "string"
                            },
                            "nombre": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the name of the category could not be retrieved",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/categoria":{
          "post": {
            "summary": "Create a category",
            "tags": ["Categoria"],
            "parameters": [
              {
                "in": "query",
                "name": "idCategoria",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the category to create"
              },
              {
                "in": "query",
                "name": "nombre",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The name of the category to create"
              }
            ],
            "responses": {
              "200": {
                "description": "A category object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "categoria": {
                          "type": "object",
                          "properties": {
                            "idCategoria": {
                              "type": "string"
                            },
                            "nombre": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the category could not be created",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/Categoria":{
          "put": {
            "summary": "Update a category",
            "tags": ["Categoria"],
            "parameters": [
              {
                "in": "query",
                "name": "idCategoria",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the category to update"
              },
              {
                "in": "query",
                "name": "nombre",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The name of the category to update"
              }
            ],
            "responses": {
              "200": {
                "description": "A category object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "categoria": {
                          "type": "object",
                          "properties": {
                            "idCategoria": {
                              "type": "string"
                            },
                            "nombre": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the category could not be updated",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/categorias/:id":{
          "delete": {
            "summary": "Delete a category",
            "tags": ["Categoria"],
            "parameters": [
              {
                "in": "query",
                "name": "idCategoria",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the category to delete"
              }
            ],
            "responses": {
              "200": {
                "description": "Message that the category has been deleted successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "message": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the category could not be deleted",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/palabraPorCategoria": {
          "get": {
            "summary": "Retrieve the list of word to categories",
            "tags": ["PalabraPorCategoria"],
            "responses": {
              "200": {
                "description": "A word to category object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "palabraPorCategoria": {
                          "type": "object",
                          "properties": {
                            "idPalabra": {
                              "type": "string"
                            },
                            "idCategoria": {
                              "type": "string"
                            },
                            "palabra": {
                              "type": "string"
                            },
                            "categoria": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the word of category could not be retrieved",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/palabraPorCategoria/palabra/:idPalabra":{
          "get": {
            "summary": "Retrieve the word to category by idPalabra",
            "tags": ["PalabraPorCategoria"],
            "parameters": [
              {
                "in": "query",
                "name": "idPalabra",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the word to retrieve"
              }
            ],
            "responses": {
              "200": {
                "description": "A word of category object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "palabraPorCategoria": {
                          "type": "object",
                          "properties": {
                            "idPalabra": {
                              "type": "string"
                            },
                            "idCategoria": {
                              "type": "string"
                            },
                            "palabra": {
                              "type": "string"
                            },
                            "categoria": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the id of the word could not be retrieved",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Error message if the id of the word does not exist",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/palabraPorCategoria/categoria/:idCategoria":{
          "get": {
            "summary": "Retrieve the word of category by idCategoria",
            "tags": ["PalabraPorCategoria"],
            "parameters": [
              {
                "in": "query",
                "name": "idCategoria",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the category to retrieve"
              }
            ],
            "responses": {
              "200": {
                "description": "A word to category object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "palabraPorCategoria": {
                          "type": "object",
                          "properties": {
                            "idPalabra": {
                              "type": "string"
                            },
                            "idCategoria": {
                              "type": "string"
                            },
                            "palabra": {
                              "type": "string"
                            },
                            "categoria": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the name of the category could not be retrieved",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              },
              "404":{
                "description": "Error message if the id of the category does not exist",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                
              }
            }
          }
        },
      },
        "/PalabraPorCategoria":{
          "post": {
            "summary": "Create a word to category",
            "tags": ["PalabraPorCategoria"],
            "parameters": [
              {
                "in": "query",
                "name": "idPalabra",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the word to create"
              },
              {
                "in": "query",
                "name": "idCategoria",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the category to create"
              },
              {
                "in": "query",
                "name": "palabra",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The name of the word to create"
              },
              {
                "in": "query",
                "name": "categoria",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The name of the category to create"
              }
            ],
            "responses": {
              "200": {
                "description": "A word of category object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "palabraPorCategoria": {
                          "type": "object",
                          "properties": {
                            "idPalabra": {
                              "type": "string"
                            },
                            "idCategoria": {
                              "type": "string"
                            },
                            "palabra": {
                              "type": "string"
                            },
                            "categoria": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the word to category could not be created",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/palabraPorCategoria/:idPalabra/:idCategoria":{
          "delete": {
            "summary": "Delete a word to category",
            "tags": ["PalabraPorCategoria"],
            "parameters": [
              {
                "in": "query",
                "name": "idPalabra",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the word to delete"
              },
              {
                "in": "query",
                "name": "idCategoria",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the category to delete"
              }
            ],
            "responses": {
              "200": {
                "description": "Message that the word to category has been deleted successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "message": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the word to category could not be deleted",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/salasDeJuego": {
          "get": {
            "summary": "Retrieve the list of game rooms",
            "tags": ["SalaDeJuego"],
            "responses": {
              "200": {
                "description": "A game room object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "salaDeJuego": {
                          "type": "object",
                          "properties": {
                            "idSalaDeJuego": {
                              "type": "string"
                            },
                            "nombre": {
                              "type": "string"
                            },
                            "idCategoria": {
                              "type": "string"
                            },
                            "estado": {
                              "type": "string"
                            },
                            "categoria": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the game room could not be retrieved",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/salaDeJuego/:nombre":{
          "get": {
            "summary": "Retrieve the game room by name",
            "tags": ["SalaDeJuego"],
            "parameters": [
              {
                "in": "query",
                "name": "nombre",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The name of the game room to retrieve"
              }
            ],
            "responses": {
              "200": {
                "description": "A word object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "salaDeJuego": {
                          "type": "object",
                          "properties": {
                            "idSalaDeJuego": {
                              "type": "string"
                            },
                            "nombre": {
                              "type": "string"
                            },
                            "idCategoria": {
                              "type": "string"
                            },
                            "estado": {
                              "type": "string"
                            },
                            "categoria": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the name of the game room could not be retrieved",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/salaDeJuego/categoria/:idCategoria":{
          "get": {
            "summary": "Retrieve the game romm by idCategory",
            "tags": ["SalaDeJuego"],
            "parameters": [
              {
                "in": "query",
                "name": "idCategoria",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the category to retrieve"
              }
            ],
            "responses": {
              "200": {
                "description": "A game romm object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "salaDeJuego": {
                          "type": "object",
                          "properties": {
                            "idSalaDeJuego": {
                              "type": "string"
                            },
                            "nombre": {
                              "type": "string"
                            },
                            "idCategoria": {
                              "type": "string"
                            },
                            "estado": {
                              "type": "string"
                            },
                            "categoria": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the id of the category could not be retrieved",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Error message if the id of the category does not exist",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              
              }
            }
          }
        },
        "/salaDeJuego/:idSalaDeJuego":{
          "get": {
            "summary": "Retrieve the game romm by idSalaDeJuego",
            "tags": ["SalaDeJuego"],
            "parameters": [
              {
                "in": "query",
                "name": "idSalaDeJuego",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the game room to retrieve"
              }
            ],
            "responses": {
              "200": {
                "description": "A game romm object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "salaDeJuego": {
                          "type": "object",
                          "properties": {
                            "idSalaDeJuego": {
                              "type": "string"
                            },
                            "nombre": {
                              "type": "string"
                            },
                            "idCategoria": {
                              "type": "string"
                            },
                            "estado": {
                              "type": "string"
                            },
                            "categoria": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the id of the game room could not be retrieved",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Error message if the id of the game room does not exist",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              
              }
            }
          }
        },
        "/salaDeJuego/obtenerPalabras/:idSalaDeJuego":{
          "get": {
            "summary": "Retrieve the words of game romm by idSalaDeJuego",
            "tags": ["SalaDeJuego"],
            "parameters": [
              {
                "in": "query",
                "name": "idSalaDeJuego",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the game room to retrieve"
              }
            ],
            "responses": {
              "200": {
                "description": "A game romm object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "salaDeJuego": {
                          "type": "object",
                          "properties": {
                            "idPalabra": {
                              "type": "string"
                            },
                            "idCategoria": {
                              "type": "string"
                            },
                            "palabra": {
                              "type": "string"
                            },
                            "categoria": {
                              "type": "string"
                            },
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the id of the game room could not be retrieved",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/SalaDeJuego":{
          "post": {
            "summary": "Create a game room",
            "tags": ["SalaDeJuego"],
            "parameters": [
              {
                "in": "query",
                "name": "idSalaDeJuego",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the game room to create"
              },
              {
                "in": "query",
                "name": "nombre",
                "required": false,
                "schema": {
                  "type": "string"
                },
                "description": "The name of the game room to create"
              },
              {
                "in": "query",
                "name": "idCategoria",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the categoria to create"
              },
              {
                "in": "query",
                "name": "estado",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The status of the game room to create"
              },
              {
                "in": "query",
                "name": "categoria",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The name of the category to create"
              }
            ],
            "responses": {
              "200": {
                "description": "A word object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "salaDeJuego": {
                          "type": "object",
                          "properties": {
                            "idSalaDeJuego": {
                              "type": "string"
                            },
                            "nombre": {
                              "type": "string"
                            },
                            "idCategoria": {
                              "type": "string"
                            },
                            "estado": {
                              "type": "string"
                            },
                            "categoria": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the game room could not be created",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/salaDeJuegos":{
          "put": {
            "summary": "Update a game room",
            "tags": ["SalaDeJuego"],
            "parameters": [
              {
                "in": "query",
                "name": "idSalaDeJuego",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the game room to create"
              },
              {
                "in": "query",
                "name": "nombre",
                "required": false,
                "schema": {
                  "type": "string"
                },
                "description": "The name of the game room to create"
              },
              {
                "in": "query",
                "name": "idCategoria",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the categoria to create"
              },
              {
                "in": "query",
                "name": "estado",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The status of the game room to create"
              },
              {
                "in": "query",
                "name": "categoria",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The name of the category to create"
              }
            ],
            "responses": {
              "200": {
                "description": "A game room object",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "salaDeJuego": {
                          "type": "object",
                          "properties": {
                            "idPalabra": {
                              "type": "string"
                            },
                            "texto": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the game room could not be updated",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/SalaDeJuego/:idSalaDeJuego":{
          "delete": {
            "summary": "Delete a game room",
            "tags": ["SalaDeJuego"],
            "parameters": [
              {
                "in": "query",
                "name": "idSalaDeJuego",
                "required": true,
                "schema": {
                  "type": "string"
                },
                "description": "The id of the game room to delete"
              }
            ],
            "responses": {
              "200": {
                "description": "Message that the game room has been deleted successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "message": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Error message if the game room could not be deleted",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
      },
      servers: [
        {
          url: "http://localhost:3000/api",
        },
      ],
    },
    apis: ["./controllers/*.ts"],
  };

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;