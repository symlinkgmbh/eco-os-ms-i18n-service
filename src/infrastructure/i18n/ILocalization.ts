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




import { ILocalizationEntry } from "./ILocalizationEntry";
import { PkStorageI18n } from "@symlinkde/eco-os-pk-models";

export interface ILocalization {
  get(locale: string, key: string, delimeter: string | undefined): Promise<ILocalizationEntry>;
  getAll(locale: string, delimeter: string | undefined): Promise<Array<ILocalizationEntry>>;
  // addLocale(obj: PkStorageI18n.ILocaleStorageEntry): Promise<ILocalizationEntry>;
  // getLocaleById(id: string): Promise<PkStorageI18n.ILocaleStorageEntry | null>;
  // updateLocaleById(id: string, obj: PkStorageI18n.ILocaleStorageEntry): Promise<boolean>;
  // deleteLocaleById(id: string): Promise<boolean>;
}
