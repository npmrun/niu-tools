

/**
 * 任务执行状态枚举类
 * @type {{INIT: number, RUNNING: number, FINISH: number}}
 */
const enum TaskStatusEnum {
    INIT = -1, //初始化
    RUNNING = 0, //执行中
    FINISH = 1 //已完成
}

type ITask = (end: Function) => void

/**
 * 任务单元
 * @param taskId 任务id
 * @param task   任务函数
 * @param group   任务组对象
 * @constructor
 */
class TaskUnit {
    taskId: number
    status: TaskStatusEnum
    task: ITask
    private group: TaskGroup

    constructor(taskId: number, task: ITask, group: any) {
        this.taskId = taskId;  //任务唯一标识，暂时没用到
        this.status = TaskStatusEnum.INIT; //执行状态：-1初始化  0执行中  1已完成
        this.task = task; //任务内容
        this.group = group; // 任务组对象
    }

    execute() {
        this.status = TaskStatusEnum.RUNNING;
        const end = () => this.end()
        this.task(end);
    }

    end() {
        if (this.status === TaskStatusEnum.RUNNING) {
            this.status = TaskStatusEnum.FINISH
            this.group.check();
        }
    }
}

class TaskGroup {
    nextGroup: TaskGroup | null = null
    taskList: TaskUnit[] = []

    constructor() { }
    add(task: TaskUnit) {
        this.taskList.push(task);
    }
    setNextGroup(group: TaskGroup) {
        this.nextGroup = group;
    }
    start() {
        for (let i = 0; i < this.taskList.length; i++) {
            const task = this.taskList[i];
            if (task.status === TaskStatusEnum.INIT) {
                task.execute();//执行
            }
        }
    }
    check() {
        for (let i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].status !== TaskStatusEnum.FINISH) {
                return; //发现还有任务没有执行完成
            }
        }
        //任务全部执行完成,进行下一个任务组
        this.taskList = [] //清空当前任务组，让这些任务尽快回收
        if (this.nextGroup) {
            let nextGroupTemp = this.nextGroup;
            nextGroupTemp.start();
            this.nextGroup = null;//取消引用，让当前任务组尽快回收
        }
    }
}

export class asyncController<T extends ITask> {
    queue: TaskGroup[] = []
    nowTaskGroup: TaskGroup | null = null
    startCount: number = 0

    /**
     * 调用该函数表示添加并行任务
     * @param task 任务
     */
    and(task: T) {
        if (this.nowTaskGroup == null) {
            this.nowTaskGroup = new TaskGroup();
        }
        this.nowTaskGroup.add(new TaskUnit(++this.startCount, task, this.nowTaskGroup))
        return this
    }
    /**
    * 调用该函数表示添加串行任务
    * @param task 任务
    */
    next(task: T) {
        if (this.nowTaskGroup != null) this.queue.push(this.nowTaskGroup);//防止上一个添加的任务是并行的
        this.nowTaskGroup = new TaskGroup();
        this.nowTaskGroup.add(new TaskUnit(++this.startCount, task, this.nowTaskGroup));
        this.queue.push(this.nowTaskGroup);
        this.nowTaskGroup = null;//当前任务添加结束清空
        return this
    }
    /**
    * 调用该函数表示任务添加完毕，开始执行任务
    * @param endTask 任务全部结束后回调
    */
    finish = (endTask: T) => {
        if (this.nowTaskGroup != null) this.queue.push(this.nowTaskGroup);
        this.nowTaskGroup = new TaskGroup();
        this.nowTaskGroup.add(new TaskUnit(++this.startCount, endTask, this.nowTaskGroup));
        this.queue.push(this.nowTaskGroup);
        this.nowTaskGroup = null;//当前任务添加结束清空

        //组装成单向链表
        for (let i = 0; i < this.queue.length - 1; i++) {
            this.queue[i].setNextGroup(this.queue[i + 1]);
        }
        this.queue[0].start();//启动链表首个任务组
        this.queue = [] //清空任务，为下一波任务做准备
    }
}
