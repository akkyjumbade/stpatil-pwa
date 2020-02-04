import React from 'react'

import { NativeEventEmitter, NativeModules } from 'react-native'

const { ModuleWithEmitter } = NativeModules

const eventBus = new NativeEventEmitter(ModuleWithEmitter)
export default eventBus
