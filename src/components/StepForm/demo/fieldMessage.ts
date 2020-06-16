enum FieldMessage {
  /* 总览 */
  'dashboard' = '当前页面每5秒自动刷新一次',
  /* 应用管理 */
  'applicationName' = '应用的唯一标识，不能重复',
  'cronMissionName' = '定时任务的唯一标识，不能重复',
  'image' = '启动应用容器所需的镜像标识，系统将根据此名称和Tag拉取镜像',
  'imageTag' = '标识同一镜像的不同版本',
  'cpuResource' = '为容器分配的最大CPU资源数，1核=1000毫核',
  'memoryResource' = '为容器分配的最大内存资源数',
  'containerName' = '容器运行时的标识',
  'replicas' = '需要部署运行的应用实例数，即实际需要启动的Box数量',
  'historyLimit' = '应用更新后需要保存的历史版本数量，可以某个版本进行回滚，应用矩阵下的应用不支持回滚',
  'maxSurge' = '在每次更新中扩张的副本数量',
  'maxUnavailable' = '在滚动更新中，能够最多接受应用副本数少于期望副本的数量，固定IP的应用需将最大不可用数设置为1',
  'workerName' = '指定应用运行的节点名称，设置该字段后，应用实例将会被调度到该节点上',
  'bindIp' = '指定访问应用的IP地址，也称为固定IP，设置了该字段的应用副本数只能为1',
  'workerSelector' = '设置该字段后，应用实例将会被调度到具有相同标签的主机上运行',
  'workerAffinity' = '节点亲和性和节点标签的功能类似，应用实例将会被调度到符合条件的主机上运行',
  'host' = '健康检查访问的HTTP请求地址，不填默认为box ip',
  'path' = '健康检查访问的HTTP请求路径',
  'port' = '健康检查访问的端口',
  'failureThreshold' = '健康检查允许的失败次数，连续失败次数达到此阈值时系统判定应用实例不可用',
  'periodSeconds' = '每次健康检查的时间间隔',
  'timeoutSeconds' = '单次健康检查的请求超时时间',
  'cmd' = '启动命令指启动应用程序需要执行的指令，多个参数请以空格分隔',
  'volumeMounts' = '挂载volume可以将存储设置中声明使用的Pvc或Apparafile挂载到容器内的指定目录，供应用存储和配置使用',
  'volumes' = '存储声明PVC和应用配置Apparafile在使用前需要声明为volume，然后可能挂载到容器中',
  /* 主机管理 */
  'boxStatusInterval' = '每隔此时间间隔检测一次box的运行状态',
  'forceSyncInterval' = '每隔此时间间隔同步一次节点和远端Server上的Box状态',
  'appMonitorInterval' = '每隔此时间间隔向远端Server上报一次应用运行时的监控数据，包含：CPU使用、内存占用、网络出入',
  'workerMonitorInterval' = '每隔此时间间隔向远端Server上报一次节点运行时的监控数据，包含：CPU、内存、网络出入',
  /* 应用高可用 */
  'setting' = '在触发条件中如果有任意条件满足，则执行副本扩张；如果所有条件均不满足，则执行副本收缩。',
  'boxLimit' = '最小或最大副本限制，伸缩副本时不会超出此限制。',
  // 存储卷新增
  'volumeCreatePath' = '此路径为资源池中路径的相对路径',
  /* 应用矩阵 */
  'status' = '“--”表示已定义的应用由于启动顺序的原因还未开始正式执行',
  'cronExpression' = 'Unix Cron表达式，定义了任务的执行周期和频率',
  'concurrencyPolicy' = '同一个CronMission下多个Mission之间的并发策略',
  'successfulMissionsHistoryLimit' = '保留执行成功的历史Mission数',
  'failedMissionsHistoryLimit'= '保留执行失败的历史Mission数',
  'name' = '任务的唯一标识，不能重复',
  'restartPolicy' = '重启策略'
}

export default FieldMessage;
