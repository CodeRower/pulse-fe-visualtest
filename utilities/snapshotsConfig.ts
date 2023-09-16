export const configureSnapshotPath =
  (options?: {}) =>
  ({}: any, testInfo: TestInfo): any => {
    const originalSnapshotPath = testInfo.snapshotPath;

    testInfo.snapshotPath = (snapshotName) => {
      const result = originalSnapshotPath
        .apply(testInfo, [snapshotName])
        .replace("-linux", "")
        .replace("-darwin", "");

      return result;
    };
  };