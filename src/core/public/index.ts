/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/**
 * The OpenSearch Dashboards Core APIs for client-side plugins.
 *
 * A plugin's `public/index` file must contain a named import, `plugin`, that
 * implements {@link PluginInitializer} which returns an object that implements
 * {@link Plugin}.
 *
 * The plugin integrates with the core system via lifecycle events: `setup`,
 * `start`, and `stop`. In each lifecycle method, the plugin will receive the
 * corresponding core services available (either {@link CoreSetup} or
 * {@link CoreStart}) and any interfaces returned by dependency plugins'
 * lifecycle method. Anything returned by the plugin's lifecycle method will be
 * exposed to downstream dependencies when their corresponding lifecycle methods
 * are invoked.
 *
 * @packageDocumentation
 */

import './index.scss';

import {
  ChromeBadge,
  ChromeBrand,
  ChromeBreadcrumb,
  ChromeHelpExtension,
  ChromeHelpExtensionMenuLink,
  ChromeHelpExtensionMenuCustomLink,
  ChromeHelpExtensionMenuDiscussLink,
  ChromeHelpExtensionMenuDocumentationLink,
  ChromeHelpExtensionMenuGitHubLink,
  ChromeNavControl,
  ChromeNavControls,
  ChromeNavLink,
  ChromeNavLinks,
  ChromeNavLinkUpdateableFields,
  ChromeDocTitle,
  ChromeStart,
  ChromeRecentlyAccessed,
  ChromeRecentlyAccessedHistoryItem,
  NavType,
} from './chrome';
import { FatalErrorsSetup, FatalErrorsStart, FatalErrorInfo } from './fatal_errors';
import { HttpSetup, HttpStart } from './http';
import { I18nStart } from './i18n';
import { NotificationsSetup, NotificationsStart } from './notifications';
import { OverlayStart } from './overlays';
import { Plugin, PluginInitializer, PluginInitializerContext, PluginOpaqueId } from './plugins';
import { UiSettingsState, IUiSettingsClient } from './ui_settings';
import { ApplicationSetup, Capabilities, ApplicationStart } from './application';
import { DocLinksStart } from './doc_links';
import { SavedObjectsStart } from './saved_objects';
import {
  IContextContainer,
  IContextProvider,
  ContextSetup,
  HandlerFunction,
  HandlerContextType,
  HandlerParameters,
} from './context';

export { PackageInfo, EnvironmentMode } from '../server/types';
/** @interal */
export { CoreContext, CoreSystem } from './core_system';
export { DEFAULT_APP_CATEGORIES } from '../utils';
export {
  AppCategory,
  UiSettingsParams,
  UserProvidedValues,
  UiSettingsType,
  ImageValidation,
  StringValidation,
  StringValidationRegex,
  StringValidationRegexString,
} from '../types';

export {
  ApplicationSetup,
  ApplicationStart,
  App,
  PublicAppInfo,
  AppMount,
  AppMountDeprecated,
  AppUnmount,
  AppMountContext,
  AppMountParameters,
  AppLeaveHandler,
  AppLeaveActionType,
  AppLeaveAction,
  AppLeaveDefaultAction,
  AppLeaveConfirmAction,
  AppStatus,
  AppNavLinkStatus,
  AppUpdatableFields,
  AppUpdater,
  ScopedHistory,
  NavigateToAppOptions,
} from './application';

export {
  SavedObjectsBatchResponse,
  SavedObjectsBulkCreateObject,
  SavedObjectsBulkCreateOptions,
  SavedObjectsBulkUpdateObject,
  SavedObjectsBulkUpdateOptions,
  SavedObjectsCreateOptions,
  SavedObjectsFindResponsePublic,
  SavedObjectsUpdateOptions,
  SavedObject,
  SavedObjectAttribute,
  SavedObjectAttributes,
  SavedObjectAttributeSingle,
  SavedObjectError,
  SavedObjectReference,
  SavedObjectsBaseOptions,
  SavedObjectsFindOptions,
  SavedObjectsMigrationVersion,
  SavedObjectsClientContract,
  SavedObjectsClient,
  SimpleSavedObject,
  SavedObjectsImportResponse,
  SavedObjectsImportSuccess,
  SavedObjectsImportConflictError,
  SavedObjectsImportAmbiguousConflictError,
  SavedObjectsImportUnsupportedTypeError,
  SavedObjectsImportMissingReferencesError,
  SavedObjectsImportUnknownError,
  SavedObjectsImportError,
  SavedObjectsImportRetry,
  SavedObjectsNamespaceType,
} from './saved_objects';

export {
  HttpHeadersInit,
  HttpRequestInit,
  HttpFetchError,
  HttpFetchOptions,
  HttpFetchOptionsWithPath,
  HttpFetchQuery,
  HttpInterceptorResponseError,
  HttpInterceptorRequestError,
  HttpInterceptor,
  HttpResponse,
  HttpHandler,
  IBasePath,
  IAnonymousPaths,
  IHttpInterceptController,
  IHttpFetchError,
  IHttpResponseInterceptorOverrides,
} from './http';

export { OverlayStart, OverlayBannersStart, OverlayRef } from './overlays';

export {
  Toast,
  ToastInput,
  IToasts,
  ToastsApi,
  ToastInputFields,
  ToastsSetup,
  ToastsStart,
  ToastOptions,
  ErrorToastOptions,
} from './notifications';

export { MountPoint, UnmountCallback, PublicUiSettingsParams } from './types';

export { URL_MAX_LENGTH } from './core_app';

/**
 * Core services exposed to the `Plugin` setup lifecycle
 *
 * @typeParam TPluginsStart - the type of the consuming plugin's start dependencies. Should be the same
 *                            as the consuming {@link Plugin}'s `TPluginsStart` type. Used by `getStartServices`.
 * @typeParam TStart - the type of the consuming plugin's start contract. Should be the same as the
 *                     consuming {@link Plugin}'s `TStart` type. Used by `getStartServices`.
 *
 * @public
 *
 * @internalRemarks We document the properties with \@link tags to improve
 * navigation in the generated docs until there's a fix for
 * https://github.com/Microsoft/web-build-tools/issues/1237
 */
export interface CoreSetup<TPluginsStart extends object = object, TStart = unknown> {
  /** {@link ApplicationSetup} */
  application: ApplicationSetup;
  /**
   * {@link ContextSetup}
   * @deprecated
   */
  context: ContextSetup;
  /** {@link FatalErrorsSetup} */
  fatalErrors: FatalErrorsSetup;
  /** {@link HttpSetup} */
  http: HttpSetup;
  /** {@link NotificationsSetup} */
  notifications: NotificationsSetup;
  /** {@link IUiSettingsClient} */
  uiSettings: IUiSettingsClient;
  /**
   * exposed temporarily until https://github.com/elastic/kibana/issues/41990 done
   * use *only* to retrieve config values. There is no way to set injected values
   * in the new platform.
   * @deprecated
   * */
  injectedMetadata: {
    getInjectedVar: (name: string, defaultValue?: any) => unknown;
  };
  /** {@link StartServicesAccessor} */
  getStartServices: StartServicesAccessor<TPluginsStart, TStart>;
}

/**
 * Allows plugins to get access to APIs available in start inside async
 * handlers, such as {@link App.mount}. Promise will not resolve until Core
 * and plugin dependencies have completed `start`.
 *
 * @public
 */
export type StartServicesAccessor<
  TPluginsStart extends object = object,
  TStart = unknown
> = () => Promise<[CoreStart, TPluginsStart, TStart]>;

/**
 * Core services exposed to the `Plugin` start lifecycle
 *
 * @public
 *
 * @internalRemarks We document the properties with \@link tags to improve
 * navigation in the generated docs until there's a fix for
 * https://github.com/Microsoft/web-build-tools/issues/1237
 */
export interface CoreStart {
  /** {@link ApplicationStart} */
  application: ApplicationStart;
  /** {@link ChromeStart} */
  chrome: ChromeStart;
  /** {@link DocLinksStart} */
  docLinks: DocLinksStart;
  /** {@link HttpStart} */
  http: HttpStart;
  /** {@link SavedObjectsStart} */
  savedObjects: SavedObjectsStart;
  /** {@link I18nStart} */
  i18n: I18nStart;
  /** {@link NotificationsStart} */
  notifications: NotificationsStart;
  /** {@link OverlayStart} */
  overlays: OverlayStart;
  /** {@link IUiSettingsClient} */
  uiSettings: IUiSettingsClient;
  /** {@link FatalErrorsStart} */
  fatalErrors: FatalErrorsStart;
  /**
   * exposed temporarily until https://github.com/elastic/kibana/issues/41990 done
   * use *only* to retrieve config values. There is no way to set injected values
   * in the new platform.
   * @deprecated
   * */
  injectedMetadata: {
    getInjectedVar: (name: string, defaultValue?: any) => unknown;
  };
}

export {
  Capabilities,
  ChromeBadge,
  ChromeBrand,
  ChromeBreadcrumb,
  ChromeHelpExtension,
  ChromeHelpExtensionMenuLink,
  ChromeHelpExtensionMenuCustomLink,
  ChromeHelpExtensionMenuDiscussLink,
  ChromeHelpExtensionMenuDocumentationLink,
  ChromeHelpExtensionMenuGitHubLink,
  ChromeNavControl,
  ChromeNavControls,
  ChromeNavLink,
  ChromeNavLinks,
  ChromeNavLinkUpdateableFields,
  ChromeDocTitle,
  ChromeRecentlyAccessed,
  ChromeRecentlyAccessedHistoryItem,
  ChromeStart,
  IContextContainer,
  HandlerFunction,
  HandlerContextType,
  HandlerParameters,
  IContextProvider,
  ContextSetup,
  DocLinksStart,
  FatalErrorInfo,
  FatalErrorsSetup,
  FatalErrorsStart,
  HttpSetup,
  HttpStart,
  I18nStart,
  NotificationsSetup,
  NotificationsStart,
  Plugin,
  PluginInitializer,
  PluginInitializerContext,
  SavedObjectsStart,
  PluginOpaqueId,
  IUiSettingsClient,
  UiSettingsState,
  NavType,
};

export { __osdBootstrap__ } from './osd_bootstrap';
