/**
 * Copyright 2018-2020 Symlink GmbH
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */




import { ILocalization } from "./ILocalization";
import { ILocalizationEntry } from "./ILocalizationEntry";
import { injectable } from "inversify";
import * as german from "./store/de.json";
import * as english from "./store/en.json";
import { Log, LogLevel } from "@symlinkde/eco-os-pk-log";

@injectable()
class Localization implements ILocalization {
  public async get(locale: string, key: string, delimeter: string | undefined): Promise<ILocalizationEntry> {
    const localeEntries = await this.getAll(locale, delimeter);
    const localeIndex = localeEntries.findIndex((entry) => {
      return entry.key === key;
    });

    return localeEntries[localeIndex];
  }

  public async getAll(locale: string, delimeter: string | undefined): Promise<Array<ILocalizationEntry>> {
    return await this.loadLocaleFromFile(locale, delimeter);
  }

  private async loadLocaleFromFile(locale: string, delimeter: string | undefined): Promise<Array<ILocalizationEntry>> {
    const de: any = german;
    const en: any = english;
    delete de.default;
    delete en.default;
    switch (locale) {
      case "de":
        return Object.keys(de).map((k) => {
          if (delimeter) {
            return <ILocalizationEntry>{
              locale: "de",
              key: `${String(k).replace("#", delimeter)}`,
              value: de[k],
            };
          }
          return <ILocalizationEntry>{
            locale: "de",
            key: `${String(k).replace("#", ".")}`,
            value: de[k],
          };
        });

      case "en":
        return Object.keys(en).map((k) => {
          if (delimeter) {
            return <ILocalizationEntry>{
              locale: "en",
              key: `${String(k).replace("#", delimeter)}`,
              value: en[k],
            };
          }
          return <ILocalizationEntry>{
            locale: "en",
            key: `${String(k).replace("#", ".")}`,
            value: en[k],
          };
        });
      default:
        Log.log(`swith to fallback language for ${locale}`, LogLevel.warning);
        return Object.keys(en).map((k) => {
          if (delimeter) {
            return <ILocalizationEntry>{
              locale: "en",
              key: `${String(k).replace("#", delimeter)}`,
              value: en[k],
            };
          }
          return <ILocalizationEntry>{
            locale: "en",
            key: `${String(k).replace("#", ".")}`,
            value: en[k],
          };
        });
    }
  }
}

export { Localization };
