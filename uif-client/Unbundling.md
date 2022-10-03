# Unbundling

uif-client % ng build --stats-json && webpack-bundle-analyzer dist/uif-client/stats.json
✔ Browser application bundle generation complete.
✔ Copying assets complete.
✔ Index html generation complete.

Initial Chunk Files           | Names         |  Raw Size | Estimated Transfer Size
main.55d4b3a6a01761d3.js      | main          |   1.08 MB |               267.76 kB
styles.e6d5a41d451884b1.css   | styles        | 141.09 kB |                 8.54 kB
polyfills.a3d939ae94c36124.js | polyfills     |  33.08 kB |                10.63 kB
runtime.4d87f220da4653fe.js   | runtime       |   1.46 kB |               773 bytes

                              | Initial Total |   1.25 MB |               287.69 kB

Build at: 2022-09-29T11:25:35.152Z - Hash: 601fea8f085616a1 - Time: 16692ms

Warning: bundle initial exceeded maximum budget. Budget 1.00 MB was not met by 254.48 kB with a total of 1.25 MB.

## Test ng-mat reusing in signup module

### Before

Gzipped:
Show chunks:
All (349.8 KB)

### After

Gzipped:
Show chunks:
All (350 KB)

Adding snackbar - + 5KB.

### Before Moving auth service and guard to auth module

All (355.5 KB)
main.07b093454c000ad9.js (300.05 KB)
144.51af64c504db02c8.js (15.06 KB)
272.51d6dd9df6d094ca.js (14.51 KB)
polyfills.a3d939ae94c36124.js (11.7 KB)
382.c180c01689fe6419.js (6.62 KB)
626.b97be616247e2e4b.js (2.25 KB)
675.117c3ae766708053.js (2.04 KB)
runtime.0a5b3d2e0f4655f8.js (1.67 KB)
4.c697e19cf6a49d7b.js (1.18 KB)
526.e2fc2d31e4dfd770.js (428 B)

### After Moving auth service and guard to auth module - Before light-land

All (356.02 KB)
main.2be14ee245a466e6.js (300.55 KB)
144.51af64c504db02c8.js (15.06 KB)
272.51d6dd9df6d094ca.js (14.51 KB)
polyfills.a3d939ae94c36124.js (11.7 KB)
382.c180c01689fe6419.js (6.62 KB)
626.b97be616247e2e4b.js (2.25 KB)
675.4cc511ebe569bcf9.js (2.06 KB)
runtime.610e158b202c2583.js (1.67 KB)
4.1ed68e5fd010b625.js (1.18 KB)
526.e2fc2d31e4dfd770.js (428 B)

Initial Chunk Files           | Names                              |   Raw Size | Estimated Transfer Size
main.7af33f6d501e4d0f.js      | main                               | 1017.43 kB |               255.28 kB
styles.ce19b654846c5807.css   | styles                             |   74.08 kB |                 7.71 kB
polyfills.a3d939ae94c36124.js | polyfills                          |   33.08 kB |                10.63 kB
runtime.2bd6ed3047049393.js   | runtime                            |    3.10 kB |                 1.49 kB

                              | Initial Total                      |    1.10 MB |               275.11 kB

Lazy Chunk Files              | Names                              |   Raw Size | Estimated Transfer Size
144.51af64c504db02c8.js       | modules-tasks-tasks-module         |   64.40 kB |                13.58 kB
272.51d6dd9df6d094ca.js       | modules-tasks-tasks-module         |   54.73 kB |                13.12 kB
382.c180c01689fe6419.js       | modules-tasks-tasks-module         |   24.28 kB |                 5.97 kB
675.4cc511ebe569bcf9.js       | modules-auth-auth-module           |    8.04 kB |                 1.79 kB
626.6abd2445bfa7ffd8.js       | modules-stories-stories-module     |    7.25 kB |                 1.99 kB
4.1ed68e5fd010b625.js         | modules-main-main-module           |    2.72 kB |                 1.06 kB
526.e2fc2d31e4dfd770.js       | modules-not-found-not-found-module |  783 bytes |               381 bytes

## After Light-land

Initial Chunk Files           | Names                              |   Raw Size | Estimated Transfer Size
main.7af33f6d501e4d0f.js      | main                               | 1017.43 kB |               255.28 kB
styles.ce19b654846c5807.css   | styles                             |   74.08 kB |                 7.71 kB
polyfills.a3d939ae94c36124.js | polyfills                          |   33.08 kB |                10.63 kB
runtime.2bd6ed3047049393.js   | runtime                            |    3.10 kB |                 1.49 kB

| Initial Total                      |    1.10 MB |               275.11 kB

Lazy Chunk Files              | Names                              |   Raw Size | Estimated Transfer Size
144.51af64c504db02c8.js       | modules-tasks-tasks-module         |   64.40 kB |                13.58 kB
272.51d6dd9df6d094ca.js       | modules-tasks-tasks-module         |   54.73 kB |                13.12 kB
382.c180c01689fe6419.js       | modules-tasks-tasks-module         |   24.28 kB |                 5.97 kB
675.4cc511ebe569bcf9.js       | modules-auth-auth-module           |    8.04 kB |                 1.79 kB
626.6abd2445bfa7ffd8.js       | modules-stories-stories-module     |    7.25 kB |                 1.99 kB
4.1ed68e5fd010b625.js         | modules-main-main-module           |    2.72 kB |                 1.06 kB
526.e2fc2d31e4dfd770.js       | modules-not-found-not-found-module |  783 bytes |               381 bytes

Build at: 2022-10-03T07:32:44.799Z - Hash: 8ceef2201783da40 - Time: 17665ms
