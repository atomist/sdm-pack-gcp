/*
 * Copyright © 2020 Atomist, Inc.
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
 */

import {
    CompressingGoalCache,
    CompressionMethod,
} from "@atomist/sdm-core/lib/goal/cache/CompressingGoalCache";
import { metadata } from "@atomist/sdm/lib/api-helper/misc/extensionPack";
import { ExtensionPack } from "@atomist/sdm/lib/api/machine/ExtensionPack";
import * as _ from "lodash";
import { GoogleCloudStorageGoalCacheArchiveStore } from "./cache";

/**
 * Default the goal cache store to a CompressingGoalCache using
 * [[GoogleCloudStorageGoalCacheArchiveStore]] as its storage back
 * end.
 */
export function gcpSupport(options: { compression?: CompressionMethod } = {}): ExtensionPack {
    return {
        ...metadata(),
        configure: sdm => {
            _.defaultsDeep(sdm.configuration, {
                sdm: {
                    cache: {
                        store: new CompressingGoalCache(
                            new GoogleCloudStorageGoalCacheArchiveStore(),
                            options.compression),
                    },
                },
            });
            return sdm;
        },
    };
}
