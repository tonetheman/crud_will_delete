
var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

  var PACKAGE_PATH;
  if (typeof window === 'object') {
    PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
  } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'game.data';
    var REMOTE_PACKAGE_BASE = 'game.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
    Module['locateFile'](REMOTE_PACKAGE_BASE) :
    ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);

    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;

    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onerror = function(event) {
        throw new Error("NetworkError for: " + packageName);
      }
      xhr.onload = function(event) {
        if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
          var packageData = xhr.response;
          callback(packageData);
        } else {
          throw new Error(xhr.statusText + " : " + xhr.responseURL);
        }
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
      Module['FS_createPath']('/', '.git', true, true);
      Module['FS_createPath']('.git', 'branches', true, true);
      Module['FS_createPath']('.git', 'hooks', true, true);
      Module['FS_createPath']('.git', 'info', true, true);
      Module['FS_createPath']('.git', 'logs', true, true);
      Module['FS_createPath']('.git/logs', 'refs', true, true);
      Module['FS_createPath']('.git/logs/refs', 'heads', true, true);
      Module['FS_createPath']('.git', 'objects', true, true);
      Module['FS_createPath']('.git/objects', '03', true, true);
      Module['FS_createPath']('.git/objects', '08', true, true);
      Module['FS_createPath']('.git/objects', '0b', true, true);
      Module['FS_createPath']('.git/objects', '0d', true, true);
      Module['FS_createPath']('.git/objects', '0f', true, true);
      Module['FS_createPath']('.git/objects', '10', true, true);
      Module['FS_createPath']('.git/objects', '11', true, true);
      Module['FS_createPath']('.git/objects', '1a', true, true);
      Module['FS_createPath']('.git/objects', '1c', true, true);
      Module['FS_createPath']('.git/objects', '23', true, true);
      Module['FS_createPath']('.git/objects', '26', true, true);
      Module['FS_createPath']('.git/objects', '2e', true, true);
      Module['FS_createPath']('.git/objects', '2f', true, true);
      Module['FS_createPath']('.git/objects', '32', true, true);
      Module['FS_createPath']('.git/objects', '34', true, true);
      Module['FS_createPath']('.git/objects', '36', true, true);
      Module['FS_createPath']('.git/objects', '38', true, true);
      Module['FS_createPath']('.git/objects', '3c', true, true);
      Module['FS_createPath']('.git/objects', '41', true, true);
      Module['FS_createPath']('.git/objects', '42', true, true);
      Module['FS_createPath']('.git/objects', '46', true, true);
      Module['FS_createPath']('.git/objects', '47', true, true);
      Module['FS_createPath']('.git/objects', '48', true, true);
      Module['FS_createPath']('.git/objects', '4b', true, true);
      Module['FS_createPath']('.git/objects', '4c', true, true);
      Module['FS_createPath']('.git/objects', '4e', true, true);
      Module['FS_createPath']('.git/objects', '51', true, true);
      Module['FS_createPath']('.git/objects', '54', true, true);
      Module['FS_createPath']('.git/objects', '57', true, true);
      Module['FS_createPath']('.git/objects', '5d', true, true);
      Module['FS_createPath']('.git/objects', '5f', true, true);
      Module['FS_createPath']('.git/objects', '62', true, true);
      Module['FS_createPath']('.git/objects', '63', true, true);
      Module['FS_createPath']('.git/objects', '67', true, true);
      Module['FS_createPath']('.git/objects', '6d', true, true);
      Module['FS_createPath']('.git/objects', '6f', true, true);
      Module['FS_createPath']('.git/objects', '70', true, true);
      Module['FS_createPath']('.git/objects', '74', true, true);
      Module['FS_createPath']('.git/objects', '76', true, true);
      Module['FS_createPath']('.git/objects', '77', true, true);
      Module['FS_createPath']('.git/objects', '80', true, true);
      Module['FS_createPath']('.git/objects', '87', true, true);
      Module['FS_createPath']('.git/objects', '88', true, true);
      Module['FS_createPath']('.git/objects', '89', true, true);
      Module['FS_createPath']('.git/objects', '8a', true, true);
      Module['FS_createPath']('.git/objects', '8d', true, true);
      Module['FS_createPath']('.git/objects', '90', true, true);
      Module['FS_createPath']('.git/objects', '93', true, true);
      Module['FS_createPath']('.git/objects', '96', true, true);
      Module['FS_createPath']('.git/objects', '99', true, true);
      Module['FS_createPath']('.git/objects', '9b', true, true);
      Module['FS_createPath']('.git/objects', '9e', true, true);
      Module['FS_createPath']('.git/objects', '9f', true, true);
      Module['FS_createPath']('.git/objects', 'a1', true, true);
      Module['FS_createPath']('.git/objects', 'a4', true, true);
      Module['FS_createPath']('.git/objects', 'aa', true, true);
      Module['FS_createPath']('.git/objects', 'ab', true, true);
      Module['FS_createPath']('.git/objects', 'b7', true, true);
      Module['FS_createPath']('.git/objects', 'b8', true, true);
      Module['FS_createPath']('.git/objects', 'b9', true, true);
      Module['FS_createPath']('.git/objects', 'bb', true, true);
      Module['FS_createPath']('.git/objects', 'bf', true, true);
      Module['FS_createPath']('.git/objects', 'c1', true, true);
      Module['FS_createPath']('.git/objects', 'c4', true, true);
      Module['FS_createPath']('.git/objects', 'c5', true, true);
      Module['FS_createPath']('.git/objects', 'c6', true, true);
      Module['FS_createPath']('.git/objects', 'c7', true, true);
      Module['FS_createPath']('.git/objects', 'ca', true, true);
      Module['FS_createPath']('.git/objects', 'cb', true, true);
      Module['FS_createPath']('.git/objects', 'cf', true, true);
      Module['FS_createPath']('.git/objects', 'd2', true, true);
      Module['FS_createPath']('.git/objects', 'd7', true, true);
      Module['FS_createPath']('.git/objects', 'd8', true, true);
      Module['FS_createPath']('.git/objects', 'da', true, true);
      Module['FS_createPath']('.git/objects', 'dc', true, true);
      Module['FS_createPath']('.git/objects', 'e0', true, true);
      Module['FS_createPath']('.git/objects', 'e1', true, true);
      Module['FS_createPath']('.git/objects', 'e4', true, true);
      Module['FS_createPath']('.git/objects', 'e5', true, true);
      Module['FS_createPath']('.git/objects', 'e6', true, true);
      Module['FS_createPath']('.git/objects', 'e7', true, true);
      Module['FS_createPath']('.git/objects', 'eb', true, true);
      Module['FS_createPath']('.git/objects', 'ed', true, true);
      Module['FS_createPath']('.git/objects', 'f6', true, true);
      Module['FS_createPath']('.git/objects', 'f9', true, true);
      Module['FS_createPath']('.git/objects', 'fb', true, true);
      Module['FS_createPath']('.git/objects', 'fc', true, true);
      Module['FS_createPath']('.git/objects', 'fd', true, true);
      Module['FS_createPath']('.git/objects', 'info', true, true);
      Module['FS_createPath']('.git/objects', 'pack', true, true);
      Module['FS_createPath']('.git', 'refs', true, true);
      Module['FS_createPath']('.git/refs', 'heads', true, true);
      Module['FS_createPath']('.git/refs', 'tags', true, true);
      Module['FS_createPath']('/', 'PNG', true, true);
      Module['FS_createPath']('PNG', 'Background', true, true);
      Module['FS_createPath']('PNG', 'Transperent', true, true);

      function DataRequest(start, end, crunched, audio) {
        this.start = start;
        this.end = end;
        this.crunched = crunched;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency']('fp ' + this.name);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

        },
        finish: function(byteArray) {
          var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      }
    };

    var files = metadata.files;
    for (i = 0; i < files.length; ++i) {
      new DataRequest(files[i].start, files[i].end, files[i].crunched, files[i].audio).open('GET', files[i].filename);
    }


    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    var IDB_RO = "readonly";
    var IDB_RW = "readwrite";
    var DB_NAME = "EM_PRELOAD_CACHE";
    var DB_VERSION = 1;
    var METADATA_STORE_NAME = 'METADATA';
    var PACKAGE_STORE_NAME = 'PACKAGES';
    function openDatabase(callback, errback) {
      try {
        var openRequest = indexedDB.open(DB_NAME, DB_VERSION);
      } catch (e) {
        return errback(e);
      }
      openRequest.onupgradeneeded = function(event) {
        var db = event.target.result;

        if(db.objectStoreNames.contains(PACKAGE_STORE_NAME)) {
          db.deleteObjectStore(PACKAGE_STORE_NAME);
        }
        var packages = db.createObjectStore(PACKAGE_STORE_NAME);

        if(db.objectStoreNames.contains(METADATA_STORE_NAME)) {
          db.deleteObjectStore(METADATA_STORE_NAME);
        }
        var metadata = db.createObjectStore(METADATA_STORE_NAME);
      };
      openRequest.onsuccess = function(event) {
        var db = event.target.result;
        callback(db);
      };
      openRequest.onerror = function(error) {
        errback(error);
      };
    };

    /* Check if there's a cached package, and if so whether it's the latest available */
    function checkCachedPackage(db, packageName, callback, errback) {
      var transaction = db.transaction([METADATA_STORE_NAME], IDB_RO);
      var metadata = transaction.objectStore(METADATA_STORE_NAME);

      var getRequest = metadata.get("metadata/" + packageName);
      getRequest.onsuccess = function(event) {
        var result = event.target.result;
        if (!result) {
          return callback(false);
        } else {
          return callback(PACKAGE_UUID === result.uuid);
        }
      };
      getRequest.onerror = function(error) {
        errback(error);
      };
    };

    function fetchCachedPackage(db, packageName, callback, errback) {
      var transaction = db.transaction([PACKAGE_STORE_NAME], IDB_RO);
      var packages = transaction.objectStore(PACKAGE_STORE_NAME);

      var getRequest = packages.get("package/" + packageName);
      getRequest.onsuccess = function(event) {
        var result = event.target.result;
        callback(result);
      };
      getRequest.onerror = function(error) {
        errback(error);
      };
    };

    function cacheRemotePackage(db, packageName, packageData, packageMeta, callback, errback) {
      var transaction_packages = db.transaction([PACKAGE_STORE_NAME], IDB_RW);
      var packages = transaction_packages.objectStore(PACKAGE_STORE_NAME);

      var putPackageRequest = packages.put(packageData, "package/" + packageName);
      putPackageRequest.onsuccess = function(event) {
        var transaction_metadata = db.transaction([METADATA_STORE_NAME], IDB_RW);
        var metadata = transaction_metadata.objectStore(METADATA_STORE_NAME);
        var putMetadataRequest = metadata.put(packageMeta, "metadata/" + packageName);
        putMetadataRequest.onsuccess = function(event) {
          callback(packageData);
        };
        putMetadataRequest.onerror = function(error) {
          errback(error);
        };
      };
      putPackageRequest.onerror = function(error) {
        errback(error);
      };
    };

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;

        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        if (Module['SPLIT_MEMORY']) Module.printErr('warning: you should run the file packager with --no-heap-copy when SPLIT_MEMORY is used, otherwise copying into the heap may fail due to the splitting');
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);

        var files = metadata.files;
        for (i = 0; i < files.length; ++i) {
          DataRequest.prototype.requests[files[i].filename].onload();
        }
        Module['removeRunDependency']('datafile_game.data');

      };
      Module['addRunDependency']('datafile_game.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      function preloadFallback(error) {
        console.error(error);
        console.error('falling back to default preload behavior');
        fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, processPackageData, handleError);
      };

      openDatabase(
        function(db) {
          checkCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME,
            function(useCached) {
              Module.preloadResults[PACKAGE_NAME] = {fromCache: useCached};
              if (useCached) {
                console.info('loading ' + PACKAGE_NAME + ' from cache');
                fetchCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME, processPackageData, preloadFallback);
              } else {
                console.info('loading ' + PACKAGE_NAME + ' from remote');
                fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE,
                  function(packageData) {
                    cacheRemotePackage(db, PACKAGE_PATH + PACKAGE_NAME, packageData, {uuid:PACKAGE_UUID}, processPackageData,
                      function(error) {
                        console.error(error);
                        processPackageData(packageData);
                      });
                  }
                  , preloadFallback);
              }
            }
            , preloadFallback);
        }
        , preloadFallback);

      if (Module['setStatus']) Module['setStatus']('Downloading...');

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

  }
  loadPackage({"package_uuid":"909f8eb7-1e70-4662-a086-b8d7e32e4af1","remote_package_size":599830,"files":[{"filename":".git/COMMIT_EDITMSG","crunched":0,"start":0,"end":12,"audio":false},{"filename":".git/HEAD","crunched":0,"start":12,"end":35,"audio":false},{"filename":".git/config","crunched":0,"start":35,"end":127,"audio":false},{"filename":".git/description","crunched":0,"start":127,"end":200,"audio":false},{"filename":".git/hooks/applypatch-msg.sample","crunched":0,"start":200,"end":678,"audio":false},{"filename":".git/hooks/commit-msg.sample","crunched":0,"start":678,"end":1574,"audio":false},{"filename":".git/hooks/fsmonitor-watchman.sample","crunched":0,"start":1574,"end":4901,"audio":false},{"filename":".git/hooks/post-update.sample","crunched":0,"start":4901,"end":5090,"audio":false},{"filename":".git/hooks/pre-applypatch.sample","crunched":0,"start":5090,"end":5514,"audio":false},{"filename":".git/hooks/pre-commit.sample","crunched":0,"start":5514,"end":7152,"audio":false},{"filename":".git/hooks/pre-push.sample","crunched":0,"start":7152,"end":8500,"audio":false},{"filename":".git/hooks/pre-rebase.sample","crunched":0,"start":8500,"end":13398,"audio":false},{"filename":".git/hooks/pre-receive.sample","crunched":0,"start":13398,"end":13942,"audio":false},{"filename":".git/hooks/prepare-commit-msg.sample","crunched":0,"start":13942,"end":15434,"audio":false},{"filename":".git/hooks/update.sample","crunched":0,"start":15434,"end":19044,"audio":false},{"filename":".git/index","crunched":0,"start":19044,"end":28261,"audio":false},{"filename":".git/info/exclude","crunched":0,"start":28261,"end":28501,"audio":false},{"filename":".git/logs/HEAD","crunched":0,"start":28501,"end":28805,"audio":false},{"filename":".git/logs/refs/heads/master","crunched":0,"start":28805,"end":29109,"audio":false},{"filename":".git/objects/03/7616a121910459a5d7fcaf5c97bf58c6ebbb5b","crunched":0,"start":29109,"end":31145,"audio":false},{"filename":".git/objects/08/09acda7fddbb733f93852d2c5f27590607879e","crunched":0,"start":31145,"end":33235,"audio":false},{"filename":".git/objects/08/5c0f140a81d197a12add3e77e56074eecfc4ac","crunched":0,"start":33235,"end":35214,"audio":false},{"filename":".git/objects/0b/d0f7c05d880cb114d7275983a39493329318cb","crunched":0,"start":35214,"end":39359,"audio":false},{"filename":".git/objects/0d/45622e86bf5eab4b81fa9f77f76715495c6d89","crunched":0,"start":39359,"end":43023,"audio":false},{"filename":".git/objects/0d/7f032ac37d39f4c91c6f9792ccc7d711124b6d","crunched":0,"start":43023,"end":44978,"audio":false},{"filename":".git/objects/0f/fd3c24bc0de310f6b62811b76b80583ba3f325","crunched":0,"start":44978,"end":46788,"audio":false},{"filename":".git/objects/10/249b2812e11fe79b715a84036d6d91847ba31f","crunched":0,"start":46788,"end":50697,"audio":false},{"filename":".git/objects/11/5689bbc332e488eac2c3062abff5517ad1622a","crunched":0,"start":50697,"end":54127,"audio":false},{"filename":".git/objects/11/c24e1068af8097676bf8a05259e7d17769da3d","crunched":0,"start":54127,"end":57804,"audio":false},{"filename":".git/objects/1a/a5f9d16f51ecc9280c31af9d4af5364f8f62c9","crunched":0,"start":57804,"end":61611,"audio":false},{"filename":".git/objects/1c/7bceec172b612c80453ca71a1a65b54fbd0c3e","crunched":0,"start":61611,"end":63414,"audio":false},{"filename":".git/objects/23/53068687fde2d04b920519140baa4011b5ad11","crunched":0,"start":63414,"end":67243,"audio":false},{"filename":".git/objects/23/745e8104f3e6891d46550b4b9b00683c742e4a","crunched":0,"start":67243,"end":68968,"audio":false},{"filename":".git/objects/26/b3ed2249717f02bd44d86bdaba488cd8106ffd","crunched":0,"start":68968,"end":70695,"audio":false},{"filename":".git/objects/2e/7d380d5409b52ca87f354f0cdef9c5efb28192","crunched":0,"start":70695,"end":72496,"audio":false},{"filename":".git/objects/2f/4f2c1dbca545b37e25d83a29c6128c9a8ef2b3","crunched":0,"start":72496,"end":76303,"audio":false},{"filename":".git/objects/2f/53da31383cc0a9df912bb9c540f59bcf357a9c","crunched":0,"start":76303,"end":78199,"audio":false},{"filename":".git/objects/2f/56fb273483f169db0ec0f41e5b9c76f7819bf4","crunched":0,"start":78199,"end":79720,"audio":false},{"filename":".git/objects/2f/b444422cdea8fa2a108e7bff6e205e91fe667a","crunched":0,"start":79720,"end":80873,"audio":false},{"filename":".git/objects/32/13035f45bfd21a3d66698752e5b82f6fa57cfe","crunched":0,"start":80873,"end":84956,"audio":false},{"filename":".git/objects/34/4d7eaa361016e8ff52c68b526668c80b79b9b0","crunched":0,"start":84956,"end":89083,"audio":false},{"filename":".git/objects/36/37ff9031c0bf3fe5398d96c3285b0c72ab69ae","crunched":0,"start":89083,"end":92794,"audio":false},{"filename":".git/objects/38/a0ba6ddc61ef0c1e1c04ef9b73aaa4570f85d8","crunched":0,"start":92794,"end":94393,"audio":false},{"filename":".git/objects/3c/cb8b5cf14647e0141b6bec0473a535f33604f4","crunched":0,"start":94393,"end":94549,"audio":false},{"filename":".git/objects/41/2244ab528e994771b22f0a006e61cb6fc6fbdf","crunched":0,"start":94549,"end":94674,"audio":false},{"filename":".git/objects/42/5b4b1f8e4e3b54b701294c49a86f548627b0f3","crunched":0,"start":94674,"end":95029,"audio":false},{"filename":".git/objects/46/be852ae659b97ade7e4f4833ff0dfefc6c0d8a","crunched":0,"start":95029,"end":99136,"audio":false},{"filename":".git/objects/46/fa434e4d9bde80ea72f31f258de4f55549a0c5","crunched":0,"start":99136,"end":103009,"audio":false},{"filename":".git/objects/47/00ffc2e965725ac0ab8af20affd93c4dd91704","crunched":0,"start":103009,"end":104631,"audio":false},{"filename":".git/objects/48/3f566318c1b53e238e199049102887c0f9e005","crunched":0,"start":104631,"end":108498,"audio":false},{"filename":".git/objects/48/733a687e23b942ff6793cb41aaa83a53ef17c0","crunched":0,"start":108498,"end":110043,"audio":false},{"filename":".git/objects/4b/43bc06789cd9e2becb4edace90e81ffa2ab67c","crunched":0,"start":110043,"end":114053,"audio":false},{"filename":".git/objects/4c/cc69a4e5c00245cb5f58482e692a882798eac6","crunched":0,"start":114053,"end":115851,"audio":false},{"filename":".git/objects/4e/f51042361ddf90351bba98262d59f0d03fd8aa","crunched":0,"start":115851,"end":117088,"audio":false},{"filename":".git/objects/51/526617a3e91faa4738928a01f7de0a81831cd4","crunched":0,"start":117088,"end":120558,"audio":false},{"filename":".git/objects/54/dd9318f415a0d597bf8e69f751b5eb1a8eb107","crunched":0,"start":120558,"end":124374,"audio":false},{"filename":".git/objects/57/2ae4f11804a70c245b56adedf33f628c651895","crunched":0,"start":124374,"end":126130,"audio":false},{"filename":".git/objects/57/9a54c0b4f0c9b02d13725106aa82864fe029ea","crunched":0,"start":126130,"end":130144,"audio":false},{"filename":".git/objects/5d/7b3623cd8229cbafd5b78091df1fecffbe943b","crunched":0,"start":130144,"end":132183,"audio":false},{"filename":".git/objects/5f/60fd9c4f6665d325b129717f5869ddbe56c600","crunched":0,"start":132183,"end":134165,"audio":false},{"filename":".git/objects/62/87e222ced5b2c71ebf04d4f6e0d2c0c5924f82","crunched":0,"start":134165,"end":138038,"audio":false},{"filename":".git/objects/63/743de689481bc7c7133db353453bcc671bbec0","crunched":0,"start":138038,"end":141890,"audio":false},{"filename":".git/objects/67/451b765842c9b17a220b7a6b54a20a0eeb1ea7","crunched":0,"start":141890,"end":145667,"audio":false},{"filename":".git/objects/6d/f459af7d8f0781ee8ca175f1838b4db51f70aa","crunched":0,"start":145667,"end":147420,"audio":false},{"filename":".git/objects/6f/615233133ac830d8c542d7caac4790626d5f24","crunched":0,"start":147420,"end":148660,"audio":false},{"filename":".git/objects/70/5f5e2960627aa6094689821c40e26a0c5083da","crunched":0,"start":148660,"end":152703,"audio":false},{"filename":".git/objects/74/537cb31842f9f9aa589703eb0a23485527a7c2","crunched":0,"start":152703,"end":154711,"audio":false},{"filename":".git/objects/74/68de6485e3cc8618baa0075dd2eaa0d6a61c0b","crunched":0,"start":154711,"end":156039,"audio":false},{"filename":".git/objects/76/100c76f17b14c0737e1145e91ba3c9404ab14a","crunched":0,"start":156039,"end":157776,"audio":false},{"filename":".git/objects/77/38c75b09834d1e34d7221d315e89de00acdf5d","crunched":0,"start":157776,"end":161688,"audio":false},{"filename":".git/objects/80/cfbddace14f717f1a374ef315310fe1afd2daa","crunched":0,"start":161688,"end":163605,"audio":false},{"filename":".git/objects/87/03f82f8b0c9b2554a53882ccd47cebd8e3082b","crunched":0,"start":163605,"end":165373,"audio":false},{"filename":".git/objects/88/5136705269d7c8810f25d26bde9fd734ea6cf8","crunched":0,"start":165373,"end":169127,"audio":false},{"filename":".git/objects/89/ad20753c5c28a027b50f386924a62fdbd30d10","crunched":0,"start":169127,"end":172853,"audio":false},{"filename":".git/objects/8a/c36b28d8978fcd294f03fdb0cfd83ebd6a1f04","crunched":0,"start":172853,"end":176541,"audio":false},{"filename":".git/objects/8d/bae0be76792486155f26b618a97d50d1fb356d","crunched":0,"start":176541,"end":180271,"audio":false},{"filename":".git/objects/90/8a1a2105352864736ee853c2c0e8f98545e9c7","crunched":0,"start":180271,"end":181484,"audio":false},{"filename":".git/objects/93/1d45a074d095655b8174982ed7a4cda338ce5b","crunched":0,"start":181484,"end":183227,"audio":false},{"filename":".git/objects/93/682e8df972203902c14b6b44f38b049d98ab4c","crunched":0,"start":183227,"end":185039,"audio":false},{"filename":".git/objects/96/689bc844cf4ac8f1782e8e93159f0a177e788f","crunched":0,"start":185039,"end":185245,"audio":false},{"filename":".git/objects/99/8fec01b891ff6bb4defcd0b19334c9af724be1","crunched":0,"start":185245,"end":189446,"audio":false},{"filename":".git/objects/9b/048073942e078721c0b3058e0c37c9167f74cd","crunched":0,"start":189446,"end":193405,"audio":false},{"filename":".git/objects/9e/d79b8ad106575ecb9dc3daac0a874c294e83a3","crunched":0,"start":193405,"end":193518,"audio":false},{"filename":".git/objects/9f/862828aa4a498a6394c8fcf5462ee6c57200c3","crunched":0,"start":193518,"end":195390,"audio":false},{"filename":".git/objects/a1/5b8a33d89812d5f16be5eb13ae6fe5b84577e5","crunched":0,"start":195390,"end":199167,"audio":false},{"filename":".git/objects/a4/e2dd67556305a9498b62bdc0026381e6c38327","crunched":0,"start":199167,"end":199293,"audio":false},{"filename":".git/objects/aa/00219688606194ca6fbd45405960a9398ac163","crunched":0,"start":199293,"end":203334,"audio":false},{"filename":".git/objects/aa/f8612db8d912a244e75328446fe0dcdc64ce8d","crunched":0,"start":203334,"end":205167,"audio":false},{"filename":".git/objects/ab/674ecfd5037c19d19772ebc79ff084967e4fba","crunched":0,"start":205167,"end":208850,"audio":false},{"filename":".git/objects/ab/d07fbcf675ffd569600faadd36a142060c4b21","crunched":0,"start":208850,"end":210448,"audio":false},{"filename":".git/objects/b7/74d84f801676e6daf6b0e6ec1b75e7d9eae28f","crunched":0,"start":210448,"end":214381,"audio":false},{"filename":".git/objects/b8/47f923082a0fa21fb4d9db45bdfd6b124e14fa","crunched":0,"start":214381,"end":216456,"audio":false},{"filename":".git/objects/b9/befa3dd739be97227d3068d19c91ae923a813b","crunched":0,"start":216456,"end":218161,"audio":false},{"filename":".git/objects/bb/a9ca2ccc783347a469cf5154193ee7afa8fc28","crunched":0,"start":218161,"end":221493,"audio":false},{"filename":".git/objects/bf/8aa1ea9cd35c4933480f88b654ca974e724973","crunched":0,"start":221493,"end":223535,"audio":false},{"filename":".git/objects/c1/851333e26cc79f3d1602e8685f39bb2482639a","crunched":0,"start":223535,"end":227343,"audio":false},{"filename":".git/objects/c4/fdda767ddb37821f3c143dcd55f53a5aa418b4","crunched":0,"start":227343,"end":231523,"audio":false},{"filename":".git/objects/c5/365393126ba2ac6da7eddb31d8ba259b687f78","crunched":0,"start":231523,"end":233570,"audio":false},{"filename":".git/objects/c6/5bbce3c13887340b02b3234c3384270b9ab009","crunched":0,"start":233570,"end":235268,"audio":false},{"filename":".git/objects/c7/921c0aea1fac6f4bb14691ddca3e7d403d850c","crunched":0,"start":235268,"end":239440,"audio":false},{"filename":".git/objects/ca/bc367a514bc3b30bf17010aa658f3cd7d8a1a5","crunched":0,"start":239440,"end":239907,"audio":false},{"filename":".git/objects/cb/1c9e7a94b774bc02925ca11f5380f699703eda","crunched":0,"start":239907,"end":241586,"audio":false},{"filename":".git/objects/cb/b673c449cd5e619db5c62a388b2f8a0b496ac0","crunched":0,"start":241586,"end":242925,"audio":false},{"filename":".git/objects/cf/81e31ed1f287ff4d8264e5560f032dce1469c9","crunched":0,"start":242925,"end":246522,"audio":false},{"filename":".git/objects/d2/a2bf1449e98ffc08849ae30013f9bee29a918f","crunched":0,"start":246522,"end":248074,"audio":false},{"filename":".git/objects/d7/a05c635a2b0bc769aa0df6c1585d4bcb163659","crunched":0,"start":248074,"end":251866,"audio":false},{"filename":".git/objects/d8/b14cc38fca86012047e8d7e7f1d726c97aab51","crunched":0,"start":251866,"end":255694,"audio":false},{"filename":".git/objects/d8/f4dddcafa27a9693a83e2cedbd76c5cc918bd0","crunched":0,"start":255694,"end":257339,"audio":false},{"filename":".git/objects/da/d8d95b3eddef605ecbb3f0b3fd11efb2d39df6","crunched":0,"start":257339,"end":259191,"audio":false},{"filename":".git/objects/dc/20d424bb80da78025f28cb7afdca6aec7b9564","crunched":0,"start":259191,"end":259278,"audio":false},{"filename":".git/objects/dc/2c8384e36a0e830f73ef0c1162ad96d9c170bb","crunched":0,"start":259278,"end":260675,"audio":false},{"filename":".git/objects/dc/f1975b6182b6d2f1ff5983195da7fa8555f20c","crunched":0,"start":260675,"end":264422,"audio":false},{"filename":".git/objects/e0/a32f6393e5a146f0e5716d77f47c5f53777f21","crunched":0,"start":264422,"end":266330,"audio":false},{"filename":".git/objects/e1/78efb54f391d649d12cfcfbdbab7ae59348e32","crunched":0,"start":266330,"end":267907,"audio":false},{"filename":".git/objects/e4/0930cc464dea6fba99379b8190e27c200a188c","crunched":0,"start":267907,"end":271718,"audio":false},{"filename":".git/objects/e5/3d531bc2921d9c564d207a48bcae64e269f568","crunched":0,"start":271718,"end":275632,"audio":false},{"filename":".git/objects/e6/105cf05e6fa5c5517034bbabf4dd971dcad8c3","crunched":0,"start":275632,"end":279432,"audio":false},{"filename":".git/objects/e7/eebecf098714bc70f0522c17c8a1be638fbe1f","crunched":0,"start":279432,"end":281159,"audio":false},{"filename":".git/objects/eb/3fb88aa8747ddd4932bd2e9f547edcb33e41c7","crunched":0,"start":281159,"end":284609,"audio":false},{"filename":".git/objects/ed/75e05c4453540f3e10d6730cfb91a5fb9d4294","crunched":0,"start":284609,"end":286257,"audio":false},{"filename":".git/objects/ed/a9d086e548d08d0d6c77a678f0a6265284c766","crunched":0,"start":286257,"end":289517,"audio":false},{"filename":".git/objects/ed/d324aa5f9a0c98f0b560aad687c5d81a9b7861","crunched":0,"start":289517,"end":293340,"audio":false},{"filename":".git/objects/f6/5162c407d60d6f64b4c8145cf1b9e3f612b1d9","crunched":0,"start":293340,"end":295250,"audio":false},{"filename":".git/objects/f9/cee3d1b4c713a3f0369369251c5c5e2f7c1206","crunched":0,"start":295250,"end":295423,"audio":false},{"filename":".git/objects/fb/90d1657abd56da858088b956e3f0b7ebf788b4","crunched":0,"start":295423,"end":299555,"audio":false},{"filename":".git/objects/fc/83979335fc1093f6e94880df3a52fc1bf8a268","crunched":0,"start":299555,"end":303496,"audio":false},{"filename":".git/objects/fd/ba52a02ea4698962ad9268f6520253a7d29d1f","crunched":0,"start":303496,"end":305205,"audio":false},{"filename":".git/refs/heads/master","crunched":0,"start":305205,"end":305246,"audio":false},{"filename":"License.txt","crunched":0,"start":305246,"end":305281,"audio":false},{"filename":"PNG/Background/Icon1.png","crunched":0,"start":305281,"end":307055,"audio":false},{"filename":"PNG/Background/Icon10.png","crunched":0,"start":307055,"end":309017,"audio":false},{"filename":"PNG/Background/Icon11.png","crunched":0,"start":309017,"end":311061,"audio":false},{"filename":"PNG/Background/Icon12.png","crunched":0,"start":311061,"end":313054,"audio":false},{"filename":"PNG/Background/Icon13.png","crunched":0,"start":313054,"end":314902,"audio":false},{"filename":"PNG/Background/Icon14.png","crunched":0,"start":314902,"end":316513,"audio":false},{"filename":"PNG/Background/Icon15.png","crunched":0,"start":316513,"end":318755,"audio":false},{"filename":"PNG/Background/Icon16.png","crunched":0,"start":318755,"end":320728,"audio":false},{"filename":"PNG/Background/Icon17.png","crunched":0,"start":320728,"end":322800,"audio":false},{"filename":"PNG/Background/Icon18.png","crunched":0,"start":322800,"end":324944,"audio":false},{"filename":"PNG/Background/Icon19.png","crunched":0,"start":324944,"end":327217,"audio":false},{"filename":"PNG/Background/Icon2.png","crunched":0,"start":327217,"end":328692,"audio":false},{"filename":"PNG/Background/Icon20.png","crunched":0,"start":328692,"end":330910,"audio":false},{"filename":"PNG/Background/Icon21.png","crunched":0,"start":330910,"end":332777,"audio":false},{"filename":"PNG/Background/Icon22.png","crunched":0,"start":332777,"end":334816,"audio":false},{"filename":"PNG/Background/Icon23.png","crunched":0,"start":334816,"end":336780,"audio":false},{"filename":"PNG/Background/Icon24.png","crunched":0,"start":336780,"end":338726,"audio":false},{"filename":"PNG/Background/Icon25.png","crunched":0,"start":338726,"end":340376,"audio":false},{"filename":"PNG/Background/Icon26.png","crunched":0,"start":340376,"end":341806,"audio":false},{"filename":"PNG/Background/Icon27.png","crunched":0,"start":341806,"end":343953,"audio":false},{"filename":"PNG/Background/Icon28.png","crunched":0,"start":343953,"end":345779,"audio":false},{"filename":"PNG/Background/Icon29.png","crunched":0,"start":345779,"end":348053,"audio":false},{"filename":"PNG/Background/Icon3.png","crunched":0,"start":348053,"end":349897,"audio":false},{"filename":"PNG/Background/Icon30.png","crunched":0,"start":349897,"end":351811,"audio":false},{"filename":"PNG/Background/Icon31.png","crunched":0,"start":351811,"end":353695,"audio":false},{"filename":"PNG/Background/Icon32.png","crunched":0,"start":353695,"end":355292,"audio":false},{"filename":"PNG/Background/Icon33.png","crunched":0,"start":355292,"end":357093,"audio":false},{"filename":"PNG/Background/Icon34.png","crunched":0,"start":357093,"end":359139,"audio":false},{"filename":"PNG/Background/Icon35.png","crunched":0,"start":359139,"end":361127,"audio":false},{"filename":"PNG/Background/Icon36.png","crunched":0,"start":361127,"end":363406,"audio":false},{"filename":"PNG/Background/Icon37.png","crunched":0,"start":363406,"end":365595,"audio":false},{"filename":"PNG/Background/Icon38.png","crunched":0,"start":365595,"end":367599,"audio":false},{"filename":"PNG/Background/Icon39.png","crunched":0,"start":367599,"end":369924,"audio":false},{"filename":"PNG/Background/Icon4.png","crunched":0,"start":369924,"end":372054,"audio":false},{"filename":"PNG/Background/Icon40.png","crunched":0,"start":372054,"end":374197,"audio":false},{"filename":"PNG/Background/Icon41.png","crunched":0,"start":374197,"end":376466,"audio":false},{"filename":"PNG/Background/Icon42.png","crunched":0,"start":376466,"end":378574,"audio":false},{"filename":"PNG/Background/Icon43.png","crunched":0,"start":378574,"end":380559,"audio":false},{"filename":"PNG/Background/Icon44.png","crunched":0,"start":380559,"end":382770,"audio":false},{"filename":"PNG/Background/Icon45.png","crunched":0,"start":382770,"end":384818,"audio":false},{"filename":"PNG/Background/Icon46.png","crunched":0,"start":384818,"end":386855,"audio":false},{"filename":"PNG/Background/Icon47.png","crunched":0,"start":386855,"end":388792,"audio":false},{"filename":"PNG/Background/Icon48.png","crunched":0,"start":388792,"end":390732,"audio":false},{"filename":"PNG/Background/Icon5.png","crunched":0,"start":390732,"end":393042,"audio":false},{"filename":"PNG/Background/Icon6.png","crunched":0,"start":393042,"end":395014,"audio":false},{"filename":"PNG/Background/Icon7.png","crunched":0,"start":395014,"end":396908,"audio":false},{"filename":"PNG/Background/Icon8.png","crunched":0,"start":396908,"end":398704,"audio":false},{"filename":"PNG/Background/Icon9.png","crunched":0,"start":398704,"end":400792,"audio":false},{"filename":"PNG/Transperent/Icon1.png","crunched":0,"start":400792,"end":404435,"audio":false},{"filename":"PNG/Transperent/Icon10.png","crunched":0,"start":404435,"end":408237,"audio":false},{"filename":"PNG/Transperent/Icon11.png","crunched":0,"start":408237,"end":412068,"audio":false},{"filename":"PNG/Transperent/Icon12.png","crunched":0,"start":412068,"end":415824,"audio":false},{"filename":"PNG/Transperent/Icon13.png","crunched":0,"start":415824,"end":419533,"audio":false},{"filename":"PNG/Transperent/Icon14.png","crunched":0,"start":419533,"end":422962,"audio":false},{"filename":"PNG/Transperent/Icon15.png","crunched":0,"start":422962,"end":426900,"audio":false},{"filename":"PNG/Transperent/Icon16.png","crunched":0,"start":426900,"end":430686,"audio":false},{"filename":"PNG/Transperent/Icon17.png","crunched":0,"start":430686,"end":434412,"audio":false},{"filename":"PNG/Transperent/Icon18.png","crunched":0,"start":434412,"end":438324,"audio":false},{"filename":"PNG/Transperent/Icon19.png","crunched":0,"start":438324,"end":442430,"audio":false},{"filename":"PNG/Transperent/Icon2.png","crunched":0,"start":442430,"end":445741,"audio":false},{"filename":"PNG/Transperent/Icon20.png","crunched":0,"start":445741,"end":449763,"audio":false},{"filename":"PNG/Transperent/Icon21.png","crunched":0,"start":449763,"end":453468,"audio":false},{"filename":"PNG/Transperent/Icon22.png","crunched":0,"start":453468,"end":457320,"audio":false},{"filename":"PNG/Transperent/Icon23.png","crunched":0,"start":457320,"end":461172,"audio":false},{"filename":"PNG/Transperent/Icon24.png","crunched":0,"start":461172,"end":464967,"audio":false},{"filename":"PNG/Transperent/Icon25.png","crunched":0,"start":464967,"end":468416,"audio":false},{"filename":"PNG/Transperent/Icon26.png","crunched":0,"start":468416,"end":471655,"audio":false},{"filename":"PNG/Transperent/Icon27.png","crunched":0,"start":471655,"end":475648,"audio":false},{"filename":"PNG/Transperent/Icon28.png","crunched":0,"start":475648,"end":479315,"audio":false},{"filename":"PNG/Transperent/Icon29.png","crunched":0,"start":479315,"end":483439,"audio":false},{"filename":"PNG/Transperent/Icon3.png","crunched":0,"start":483439,"end":487101,"audio":false},{"filename":"PNG/Transperent/Icon30.png","crunched":0,"start":487101,"end":490857,"audio":false},{"filename":"PNG/Transperent/Icon31.png","crunched":0,"start":490857,"end":494547,"audio":false},{"filename":"PNG/Transperent/Icon32.png","crunched":0,"start":494547,"end":497956,"audio":false},{"filename":"PNG/Transperent/Icon33.png","crunched":0,"start":497956,"end":501532,"audio":false},{"filename":"PNG/Transperent/Icon34.png","crunched":0,"start":501532,"end":505303,"audio":false},{"filename":"PNG/Transperent/Icon35.png","crunched":0,"start":505303,"end":509191,"audio":false},{"filename":"PNG/Transperent/Icon36.png","crunched":0,"start":509191,"end":513371,"audio":false},{"filename":"PNG/Transperent/Icon37.png","crunched":0,"start":513371,"end":517433,"audio":false},{"filename":"PNG/Transperent/Icon38.png","crunched":0,"start":517433,"end":521240,"audio":false},{"filename":"PNG/Transperent/Icon39.png","crunched":0,"start":521240,"end":525391,"audio":false},{"filename":"PNG/Transperent/Icon4.png","crunched":0,"start":525391,"end":529411,"audio":false},{"filename":"PNG/Transperent/Icon40.png","crunched":0,"start":529411,"end":533190,"audio":false},{"filename":"PNG/Transperent/Icon41.png","crunched":0,"start":533190,"end":537276,"audio":false},{"filename":"PNG/Transperent/Icon42.png","crunched":0,"start":537276,"end":541084,"audio":false},{"filename":"PNG/Transperent/Icon43.png","crunched":0,"start":541084,"end":545004,"audio":false},{"filename":"PNG/Transperent/Icon44.png","crunched":0,"start":545004,"end":549115,"audio":false},{"filename":"PNG/Transperent/Icon45.png","crunched":0,"start":549115,"end":553008,"audio":false},{"filename":"PNG/Transperent/Icon46.png","crunched":0,"start":553008,"end":556854,"audio":false},{"filename":"PNG/Transperent/Icon47.png","crunched":0,"start":556854,"end":560641,"audio":false},{"filename":"PNG/Transperent/Icon48.png","crunched":0,"start":560641,"end":564431,"audio":false},{"filename":"PNG/Transperent/Icon5.png","crunched":0,"start":564431,"end":568590,"audio":false},{"filename":"PNG/Transperent/Icon6.png","crunched":0,"start":568590,"end":572376,"audio":false},{"filename":"PNG/Transperent/Icon7.png","crunched":0,"start":572376,"end":576109,"audio":false},{"filename":"PNG/Transperent/Icon8.png","crunched":0,"start":576109,"end":579765,"audio":false},{"filename":"PNG/Transperent/Icon9.png","crunched":0,"start":579765,"end":583656,"audio":false},{"filename":"icons.lua","crunched":0,"start":583656,"end":584493,"audio":false},{"filename":"main.lua","crunched":0,"start":584493,"end":584971,"audio":false},{"filename":"readme.txt","crunched":0,"start":584971,"end":585161,"audio":false},{"filename":"strip.lua","crunched":0,"start":585161,"end":586520,"audio":false},{"filename":"tween.lua","crunched":0,"start":586520,"end":599830,"audio":false}]});

})();
