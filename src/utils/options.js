import pm from 'picomatch'

function getOption({ opts }, name, defaultValue = true) {
  return opts[name] === undefined || opts[name] === null ? defaultValue : opts[name]
}

// Options the decoupled transform actually reads. (The old compile-time options
// — minify, transpileTemplateLiterals, compileStatic, cssProp, ssr, fileName,
// pure — were removed with the machinery that used them.)
export const useDisplayName = state => getOption(state, 'displayName')

export const useTopLevelImportPathMatchers = state =>
  getOption(state, 'topLevelImportPaths', []).map(pattern => pm(pattern))

export const useMeaninglessFileNames = state =>
  getOption(state, 'meaninglessFileNames', ['index'])

export const useNamespace = state => {
  const namespace = getOption(state, 'namespace', '')
  return namespace ? `${namespace}__` : ''
}

// Mixes a hash of each template's css into its componentId, so an edited
// template re-registers under a new id instead of hitting the runtime's
// once-per-id dedup. Dev-server only: ids then change on every edit.
export const useHmr = state => getOption(state, 'hmr', false)

export const useRuntimeImportPath = state =>
  getOption(state, 'runtimeImportPath', 'bare-styled/runtime')

// Vendor prefixing of build-time precompiled rules. OFF by default, matching
// styled-components v6 and the runtime's default; if enabled here, the app must
// also call setVendorPrefixes(true) on the runtime so both halves agree.
export const useVendorPrefixes = state => getOption(state, 'vendorPrefixes', false)
