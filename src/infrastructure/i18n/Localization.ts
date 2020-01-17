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




// import { ILocalization } from "./ILocalization";
// import { ILocalizationEntry } from "./ILocalizationEntry";
// import { injectable } from "inversify";
// import * as german from "./store/de.json";
// import * as english from "./store/en.json";
// import { Log, LogLevel } from "@symlinkde/eco-os-pk-log";
// import { PkStorageI18n } from "@symlinkde/eco-os-pk-models";
// import { localeContainer, LOCALETYPES } from "@symlinkde/eco-os-pk-storage-i18n";

// @injectable()
// class Localization implements ILocalization {
//   private i18nStorage: PkStorageI18n.ILocaleService;
//   public constructor() {
//     this.i18nStorage = localeContainer.get<PkStorageI18n.ILocaleService>(LOCALETYPES.ILocaleService);
//   }

//   public async get(locale: string, key: string, delimeter: string | undefined): Promise<ILocalizationEntry> {
//     const localeEntries = await this.getAll(locale, delimeter);
//     const localeIndex = localeEntries.findIndex((entry) => {
//       return entry.key === key;
//     });

//     return localeEntries[localeIndex];
//   }

//   public async getAll(locale: string, delimeter: string | undefined): Promise<Array<ILocalizationEntry>> {
//     const localeFromDB = await this.loadLocaleFromDatabase(locale, delimeter);
//     if (localeFromDB.length < 1) {
//       return await this.loadLocaleFromFile(locale, delimeter);
//     }

//     return localeFromDB;
//   }

//   public async addLocale(obj: PkStorageI18n.ILocaleStorageEntry): Promise<ILocalizationEntry> {
//     return await this.i18nStorage.add(obj);
//   }

//   public async getLocaleById(id: string): Promise<PkStorageI18n.ILocaleStorageEntry | null> {
//     return await this.i18nStorage.getById(id);
//   }

//   public async updateLocaleById(id: string, obj: PkStorageI18n.ILocaleStorageEntry): Promise<boolean> {
//     return await this.i18nStorage.updateById(id, obj);
//   }

//   public async deleteLocaleById(id: string): Promise<boolean> {
//     return await this.i18nStorage.deleteById(id);
//   }

//   private async loadLocaleFromDatabase(
//     locale: string,
//     delimeter: string | undefined,
//   ): Promise<Array<ILocalizationEntry>> {
//     const localeFromStorage = await this.i18nStorage.getAll(locale);
//     if (localeFromStorage !== null) {
//       if (delimeter) {
//         return localeFromStorage.map(
//           (entry) => <ILocalizationEntry>{ key: String(entry.key).replace("#", delimeter), value: entry.value },
//         );
//       }
//       return localeFromStorage.map(
//         (entry) => <ILocalizationEntry>{ key: String(entry.key).replace("#", "."), value: entry.value },
//       );
//     }

//     return [];
//   }

//   private async loadLocaleFromFile(locale: string, delimeter: string | undefined): Promise<Array<ILocalizationEntry>> {
//     const de: any = german;
//     const en: any = english;
//     switch (locale) {
//       case "de":
//         return Object.keys(de).map((k) => {
//           if (delimeter) {
//             return <ILocalizationEntry>{
//               locale: "de",
//               key: `${String(k).replace("#", delimeter)}`,
//               value: de[k],
//             };
//           }
//           return <ILocalizationEntry>{
//             locale: "de",
//             key: `${String(k).replace("#", ".")}`,
//             value: de[k],
//           };
//         });

//       case "en":
//         return Object.keys(en).map((k) => {
//           if (delimeter) {
//             return <ILocalizationEntry>{
//               locale: "en",
//               key: `${String(k).replace("#", delimeter)}`,
//               value: en[k],
//             };
//           }
//           return <ILocalizationEntry>{
//             locale: "en",
//             key: `${String(k).replace("#", ".")}`,
//             value: en[k],
//           };
//         });
//       default:
//         Log.log(`swith to fallback language for ${locale}`, LogLevel.warning);
//         return Object.keys(en).map((k) => {
//           if (delimeter) {
//             return <ILocalizationEntry>{
//               locale: "en",
//               key: `${String(k).replace("#", delimeter)}`,
//               value: en[k],
//             };
//           }
//           return <ILocalizationEntry>{
//             locale: "en",
//             key: `${String(k).replace("#", ".")}`,
//             value: en[k],
//           };
//         });
//     }
//   }
// }

// export { Localization };
