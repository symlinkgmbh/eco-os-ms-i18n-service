/**
 * Copyright 2018-2019 Symlink GmbH
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



import "reflect-metadata";
import Config from "config";
import { hostname } from "os";
import { serviceContainer, bootstrapperContainer, ECO_OS_PK_CORE_TYPES } from "@symlinkde/eco-os-pk-core";
import { PkCore, PkStorageI18n } from "@symlinkde/eco-os-pk-models";
import { Log, LogLevel } from "@symlinkde/eco-os-pk-log";
import { Api } from "./api/Api";
import { localeContainer, LOCALETYPES } from "@symlinkde/eco-os-pk-storage-i18n";
import { Application } from "express";
import * as de from "./infrastructure/i18n/store/de.json";
import * as en from "./infrastructure/i18n/store/en.json";

export class Bootstrapper {
  public static getInstance(): Bootstrapper {
    if (!Bootstrapper.instance) {
      Bootstrapper.instance = new Bootstrapper();
    }

    return Bootstrapper.instance;
  }

  private static instance: Bootstrapper;
  private bootstrapper: PkCore.IBootstrapper;
  private api: Api;
  private i18nStorage: PkStorageI18n.ILocaleService;

  private constructor() {
    if (!process.env.SECONDLOCK_REGISTRY_URI) {
      throw new Error("missing SECONDLOCK_REGISTRY_URI env variable");
    }

    bootstrapperContainer.bind("SECONDLOCK_REGISTRY_URI").toConstantValue(process.env.SECONDLOCK_REGISTRY_URI);
    bootstrapperContainer.bind<PkCore.IBootstrapperConfig>(ECO_OS_PK_CORE_TYPES.IBootstrapperConfig).toConstantValue(<PkCore.IBootstrapperConfig>{
      name: Config.get("name"),
      address: hostname(),
      url: `http://${hostname()}:${Config.get("server.port")}`,
      license: {
        id: Config.get("serviceId"),
      },
    });

    this.bootstrapper = bootstrapperContainer.get<PkCore.IBootstrapper>(ECO_OS_PK_CORE_TYPES.IBootstrapper);
    serviceContainer.rebind("SECONDLOCK_REGISTRY_URI").toConstantValue(process.env.SECONDLOCK_REGISTRY_URI);
    this.i18nStorage = localeContainer.get<PkStorageI18n.ILocaleService>(LOCALETYPES.ILocaleService);
    this.api = new Api();
    this.bootstrapper.unsignFromServiceRegistryOnProcessTerminate(process);
    this.bootstrapper.loadGobalErrorHandler(process);
  }

  public async init(): Promise<Application> {
    try {
      this.initLogSystem();
      await this.bootstrapper.signInServiceRegistry();
      return await this.api.init();
    } catch (err) {
      Log.log(err, LogLevel.error);
      process.exit(1);
      throw new Error(err);
    }
  }

  private initLogSystem(): void {
    Log.log(`init ${Config.get("name")} ${Config.get("version")}`, LogLevel.info);
    return;
  }

  /**
   * @author: aicdev
   * is scheduled for next features release...
   */

  // private async importLocale(): Promise<void> {
  //   const english: any = en;
  //   const german: any = de;

  //   const importDEArray: Array<PkStorageI18n.ILocaleStorageEntry> = [];
  //   const importENArray: Array<PkStorageI18n.ILocaleStorageEntry> = [];
  //   await Object.keys(german).map(async (k, i) => {
  //     if (german.hasOwnProperty(k)) {
  //       await importDEArray.push(<PkStorageI18n.ILocaleStorageEntry>{
  //         locale: "de",
  //         key: `${k}`,
  //         value: german[k],
  //       });
  //     }
  //   });

  //   try {
  //     this.i18nStorage.addAll(importDEArray);
  //   } catch (err) {
  //     Log.log(err, LogLevel.error);
  //   }

  //   await Object.keys(english).map(async (k, i) => {
  //     if (english.hasOwnProperty(k)) {
  //       await importENArray.push(<PkStorageI18n.ILocaleStorageEntry>{
  //         locale: "en",
  //         key: `${k}`,
  //         value: english[k],
  //       });
  //     }
  //   });

  //   try {
  //     this.i18nStorage.addAll(importENArray);
  //   } catch (err) {
  //     Log.log(err, LogLevel.error);
  //   }
  // }
}
