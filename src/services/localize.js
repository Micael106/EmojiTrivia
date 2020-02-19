import * as RNLocalize from "react-native-localize"
import { Alert } from "react-native"

const strings = require('../assets/strings')
const languageCode = RNLocalize.getLocales()[0].languageCode

exports.languageCode = languageCode

exports.get = function(key) {
  const languageStrings = strings[languageCode]
  if (languageStrings != null)
    return languageStrings[key]
  return strings.en[key]
}