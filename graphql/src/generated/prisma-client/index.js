"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "measurementFormat",
    embedded: false
  },
  {
    name: "SwitchFormat",
    embedded: false
  },
  {
    name: "Figure",
    embedded: false
  },
  {
    name: "AuthPayload",
    embedded: false
  },
  {
    name: "Switch",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/kbj2060-ae9a0a/src/dev`
});
exports.prisma = new exports.Prisma();
