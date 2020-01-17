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




import { ILocalization } from "../ILocalization";
import { localizationContainer } from "../LocalizationContainer";
import { LOCALOIZATIONTYPES } from "../LocalizationTypes";

// tslint:disable-next-line:typedef
function injectLocalization<T extends new (...args: any[]) => {}>(constructor: T) {
  return class extends constructor {
    // tslint:disable-next-line:member-access
    localization: ILocalization = localizationContainer.get<ILocalization>(LOCALOIZATIONTYPES.ILocalization);
  };
}

export { injectLocalization };
