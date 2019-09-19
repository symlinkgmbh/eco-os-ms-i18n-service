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



import { AbstractRoutes, injectValidatorService } from "@symlinkde/eco-os-pk-api";
import { Application, Request, Response, NextFunction } from "express";
import { PkApi, MsOverride } from "@symlinkde/eco-os-pk-models";
import { LocalizationController } from "../controllers";

@injectValidatorService
export class LocalizationRoute extends AbstractRoutes implements PkApi.IRoute {
  private localizationController: LocalizationController = new LocalizationController();

  // private validatorService!: PkApi.IValidator;
  // private postLocalePattern: PkApi.IValidatorPattern = {
  //   locale: "",
  //   key: "",
  //   value: "",
  // };

  // private updateLocalePattern: PkApi.IValidatorPattern = {
  //   locale: "",
  //   key: "",
  //   value: "",
  // };

  constructor(app: Application) {
    super(app);
    this.activate();
  }

  public activate(): void {
    this.getLocaleByKey();
    this.getLocaleByKeyWithContent();
    // this.addLocale();
    // this.getLocaleById();
    // this.updateLocaleById();
    // this.deleteLocaleById();
  }

  private getLocaleByKey(): void {
    this.getApp()
      .route("/locale")
      .get((req: Request, res: Response, next: NextFunction) => {
        this.localizationController.getLocale(String(req.header("Accept-Language") === undefined ? "en" : req.header("Accept-Language")), req.header("X-Language-Delimeter")).then((result) => {
          res.send(result);
        });
      });
  }

  private getLocaleByKeyWithContent(): void {
    this.getApp()
      .route("/locale/:key")
      .get((req: MsOverride.IRequest, res: Response, next: NextFunction) => {
        this.localizationController
          .getLocaleByKey(String(req.header("Accept-Language") === undefined ? "en" : req.header("Accept-Language")), req.params.key, req.header("X-Language-Delimeter"))
          .then((result) => {
            res.send(result);
          })
          .catch((err) => {
            next(err);
          });
      });
  }

  // private addLocale(): void {
  //   this.getApp()
  //     .route("/locale/manage")
  //     .post((req: Request, res: Response, next: NextFunction) => {
  //       this.validatorService.validate(req.body, this.postLocalePattern);
  //       this.localizationController
  //         .addLocale(req)
  //         .then((result) => {
  //           res.send(result);
  //         })
  //         .catch((err) => {
  //           next(err);
  //         });
  //     });
  // }
  // private getLocaleById(): void {
  //   this.getApp()
  //     .route("/locale/manage/:id")
  //     .get((req: Request, res: Response, next: NextFunction) => {
  //       this.localizationController
  //         .getLocaleById(req)
  //         .then((result) => {
  //           res.send(result);
  //         })
  //         .catch((err) => {
  //           next(err);
  //         });
  //     });
  // }

  // private updateLocaleById(): void {
  //   this.getApp()
  //     .route("/locale/manage/:id")
  //     .put((req: Request, res: Response, next: NextFunction) => {
  //       this.validatorService.validate(req.body, this.updateLocalePattern);
  //       this.localizationController
  //         .updateLocaleById(req)
  //         .then((result) => {
  //           res.send(result);
  //         })
  //         .catch((err) => {
  //           next(err);
  //         });
  //     });
  // }

  // private deleteLocaleById(): void {
  //   this.getApp()
  //     .route("/locale/manage/:id")
  //     .delete((req: Request, res: Response, next: NextFunction) => {
  //       this.localizationController
  //         .deleteLocaleById(req)
  //         .then((result) => {
  //           res.send(result);
  //         })
  //         .catch((err) => {
  //           next(err);
  //         });
  //     });
  // }
}
