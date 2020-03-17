"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
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
  },
  {
    name: "SettingRange",
    embedded: false
  },
  {
    name: "Setting",
    embedded: false
  },
  {
    name: "MeasurementFormat",
    embedded: false
  },
  {
    name: "SwitchFormat",
    embedded: false
  },
  {
    name: "UserFormat",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://192.168.99.100:4466/graphql/dev`
});
exports.prisma = new exports.Prisma();
