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




import { injectLocalization } from "../../infrastructure/i18n/__decorators";
import { ILocalization } from "../../infrastructure/i18n/ILocalization";
import { ILocalizationEntry } from "../../infrastructure/i18n/ILocalizationEntry";
import { CustomRestError, apiResponseCodes } from "@symlinkde/eco-os-pk-api";

@injectLocalization
class LocalizationController {
  private localization!: ILocalization;

  public getLocale(locale: string, delimeter: string | undefined): Promise<Array<ILocalizationEntry>> {
    return this.localization.getAll(locale.substring(0, 2).toLocaleLowerCase(), delimeter);
  }

  public async getLocaleByKey(locale: string, key: string, delimeter: string | undefined): Promise<ILocalizationEntry> {
    const entry = await this.localization.get(locale.substring(0, 2).toLocaleLowerCase(), key, delimeter);
    if (entry === undefined) {
      throw new CustomRestError(
        {
          code: apiResponseCodes.C822.code,
          message: apiResponseCodes.C822.message,
        },
        404,
      );
    }
    return entry;
  }

  // public async addLocale(req: Request): Promise<ILocalizationEntry> {
  //   return await this.localization.addLocale(req.body);
  // }

  // public async getLocaleById(req: Request): Promise<ILocalizationEntry> {
  //   const result = await this.localization.getLocaleById(req.params.id);
  //   if (result === null) {
  //     throw new CustomRestError(
  //       {
  //         code: 404,
  //         message: "locale entry not found",
  //       },
  //       404,
  //     );
  //   }

  //   return result;
  // }

  // public async updateLocaleById(req: Request): Promise<boolean> {
  //   return this.localization.updateLocaleById(req.params.id, req.body);
  // }

  // public async deleteLocaleById(req: Request): Promise<boolean> {
  //   return this.localization.deleteLocaleById(req.params.id);
  // }
}

export { LocalizationController };
