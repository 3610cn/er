/**
 * ER (Enterprise RIA)
 * Copyright 2012 Baidu Inc. All rights reserved.
 * 
 * @file Deferred类实现
 * @author otakustay
 */
 define(
    'Deferred',
    function(require) {
        var util = require('./util');
        var assert = require('./assert');

        /**
         * 尝试执行相关的回调函数
         * 
         * 当`deferred`处于非**pending**状态时，根据其状态，
         * 立即异步地运行对应的回调函数
         *
         * @param {Deferred} deferred 需要处理的`Deferred`实例
         */
        function tryFlush(deferred) {
            if (deferred._state === 'pending') {
                return;
            }

            var callbacks = deferred._state === 'resolved'
                ? deferred._doneCallbacks.slice()
                : deferred._failCallbacks.slice();

            setTimeout(
                function() {
                    for (var i = 0; i < callbacks.length; i++) {
                        var callback = callbacks[i];
                        try {
                            callback.apply(deferred, deferred._args);
                        }
                        catch (ex) {
                        }
                    }
                },
                0
            );

            deferred._doneCallbacks = [];
            deferred._failCallbacks = [];
        }

        /**
         * 将一个原有的`Deferred`与一个新的`Deferred`对象连接起来
         * 
         * 该方法作为`then`方法的核心
         *
         * @param {Deferred} original 原`Deferred`对象
         * @param {Deferred} deferred 新`Deferred`对象
         * @param {callback} 当`original`运行完毕后，需要执行的函数
         * @param {string} actionType 关联的动作类型，`'resolve'`或`'reject'`
         * @return {function} 关联函数，可注册在`original`的相关回调函数上
         */
        function pipe(original, deferred, callback, actionType) {
            return function() {
                // `.then(done)`及`.then(null, fail)`时使用
                // 
                // 根据`callback`的行为，进行以下处理：
                // 
                // - 如果`callback`返回值，则用该值改`deferred`为**resolved**
                // - 如果`callback`抛出异常，则用异常改`deferred`为**rejected**
                if (typeof callback === 'function') {
                    try {
                        var returnValue = callback.apply(this, arguments);

                        if (Deferred.isPromise(returnValue)) {
                            returnValue.then(
                                function() {
                                    deferred.resolve.apply(deferred, arguments);
                                },
                                function() {
                                    deferred.reject.apply(deferred, arguments);
                                }
                            );
                        }
                        else {
                            deferred.resolve.call(deferred, returnValue);
                        }
                    }
                    catch (error) {
                        deferred.reject(error);
                    }
                }
                // `.then()`及`.then(done, null)`时使用
                // 
                // 直接使用原`Deferred`保存的参数将`deferred`改为对应状态
                else {
                    deferred[actionType].apply(deferred, original._args);
                }
            };
        }

        /**
         * Deferred类
         * 
         * 类似于jQuery的Deferred对象，是对异步操作的一种封装
         */
        function Deferred() {
            this._state = 'pending';
            this._args = null;
            this._doneCallbacks = [];
            this._failCallbacks = [];

            this._promise =  {
                done: util.bindFn(this.done, this),
                fail: util.bindFn(this.fail, this),
                always: util.bindFn(this.always, this),
                then: util.bindFn(this.then, this),
                state: util.bindFn(this.state, this),
                isRejected: util.bindFn(this.isRejected, this),
                isResolved: util.bindFn(this.isResolved, this),
                isPromise: true
            };
        }
        
        /**
         * 判断一个对象是否是一个`Promise`
         * 
         * 该方法采用灵活的判断方式，并非要求`value`为`Deferred`的实例
         *
         * @param {Any} value 需要判断的对象
         * @return {boolean} 如果`value`是`Promise`对象，则返回true
         */
        Deferred.isPromise = function(value) {
            return value && typeof value.then === 'function';
        };

        /**
         * 将当前对象状态设置为**resolved**，并执行所有成功回调函数
         *
         * @param {Any...} args 执行回调时的参数
         */
        Deferred.prototype.resolve = function() {
            if (this._state !== 'pending') {
                return;
            }

            this._state = 'resolved';
            this._args = [].slice.call(arguments);

            tryFlush(this);
        };

        /**
         * 将当前对象状态设置为**rejected**，并执行所有失败回调函数
         *
         * @param {Any...} args 执行回调时的参数
         */
        Deferred.prototype.reject = function() {
            if (this._state !== 'pending') {
                return;
            }

            this._state = 'rejected';
            this._args = [].slice.call(arguments);

            tryFlush(this);
        };

        /**
         * 添加一个成功回调函数
         * 
         * 本方法相当于`.then(callback, null)，具体参考`then`方法的说明
         *
         * @param {function} callback 需要添加的回调函数
         * @return {Deferred} 新的`Deferred`对象
         */
        Deferred.prototype.done = function(callback) {
            return this.then(callback);
        };

        /**
         * 添加一个失败回调函数
         * 
         * 本方法相当于`.then(null, callback)，具体参考`then`方法的说明
         *
         * @param {function} callback 需要添加的回调函数
         * @return {Deferred} 新的`Deferred`对象
         */
        Deferred.prototype.fail = function(callback) {
            return this.then(null, callback);
        };


        /**
         * 添加一个无论成功还是失败均执行的回调函数
         * 
         * 本方法相当于`.then(callback, callback)，具体参考`then`方法的说明
         *
         * @param {function} callback 需要添加的回调函数
         * @return {Deferred} 新的`Deferred`对象
         */
        Deferred.prototype.always = function(callback) {
            return this.then(callback, callback);
        };

        /**
         * 添加成功回调函数及可选的失败回调函数
         * 
         * 该函数会返回一个新的`Deferred`对象，新`Deferred`对象将有以下行为：
         * 
         * - 当原有`Deferred`对象进入**resolved**状态时，执行`done`回调函数，
         *   并根据函数的返回值进行逻辑
         * - 当原有`Deferred`对象进入**rejected**状态时，执行`fail`回调函数，
         *   并根据函数的返回值进行逻辑
         * 
         * 其中**根据函数的返回值进行逻辑**具体如下：
         * 
         * - 当函数返回非`null`或`undefined`时，使用返回值进入**resolved**状态
         * - 当函数抛出异常时，使用异常对象进入**rejected**状态
         * - 当函数返回`null`或`undefined`时，使用原有的值进入**resolved**状态
         * 
         * 另如果当前`Deferred`对象不处在**pending**状态，则：
         * 
         * - 如果处在**resolved**状态，则成功回调函数会被立即异步执行
         * - 如果处在**rejected**状态，则失败回调函数会被立即异步执行
         *
         * @param {function} done 成功时执行的回调函数
         * @param {function=} fail 失败时执行的回调函数，可选参数
         * @return {Deferred} 新的`Deferred`对象
         */
        Deferred.prototype.then = function(done, fail) {
            var deferred = new Deferred();

            this._doneCallbacks.push(pipe(this, deferred, done, 'resolve'));
            this._failCallbacks.push(pipe(this, deferred, fail, 'reject'));

            tryFlush(this);

            return deferred.promise();
        };

        /**
         * 获取当前对象的状态
         *
         * @return {string} 返回**pending**、**resolved**或**rejected**
         */
        Deferred.prototype.state = function() {
            return this._state;
        };

        /**
         * 判断当前对象是否处在**resolved**状态
         *
         * @return {boolean} 表示当前对象是否处在**resolved**状态
         */
        Deferred.prototype.isResolved = function() {
            return this._state === 'resolved';
        };

        /**
         * 判断当前对象是否处在**rejected**状态
         *
         * @return {boolean} 表示当前对象是否处在**rejected**状态
         */
        Deferred.prototype.isRejected = function() {
            return this._state === 'rejected';
        };

        /**
         * 表示当前对象为Promise
         *
         * @type {boolean}
         */
        Deferred.prototype.isPromise = true;

        /**
         * 返回与当前对象关联的`Promise`对象
         * 
         * 一个`Promise`对象是对`Deferred`对象的**只读**状态的表达，
         * `Promise`对象拥有所有读取状态及添加回调函数的方法，包括：
         * 
         * - `done` / `fail` / `always` / `then`
         * - `state` / `isRejected` / `isResolved`
         * - `isPromise`
         * 
         * 但`Promise`对象并不包改变`Deferred`对象的方法，包括：
         * 
         * - `resolve`
         * - `reject`
         *
         * @return {Promise} 一个Promise对象
         */
        Deferred.prototype.promise = function() {
            return this._promise;
        };

        // TODO: 支持`progress`

        /**
         * 生成一个新的`Promise`对象，当所有给定的`Promise`对象完成后触发
         * 
         * 其触发逻辑如下：
         * 
         * - 如果所有给定的`Promise`对象均进入**resolved**状态，则该`Promise`
         *   对象进入**resolved**状态
         * - 如果有至少一个`Promise`对象进入**rejected**状态，则该`Promise`
         *   对象进入**rejected**状态
         * 
         * 当新的`Promise`对象触发时，将按照传入的`Promise`对象的顺序，
         * 依次提供参数，且根据原`Promise`对象的回调参数，有以下情况：
         * 
         * - 如果给定参数只有一个，使用这一个参数
         * - 如果给定多个参数，则提供一个数组包含这些参数
         *
         * @param {Promise...} 需要组合的`Promise`对象
         * @return {Promise} 一个新的`Promise`对象
         */
        Deferred.join = function() {
            // 典型的异步并发归并问题，使用计数器来解决
            var workingCount = arguments.length;
            var actionType = 'resolve';
            var result = [];

            var jointDeferred = new Deferred();

            function resolveOne(whichToFill) {
                workingCount--;

                assert.greaterThanOrEquals(
                    workingCount, 0, 'workingCount should be positive'
                );

                var unitResult = [].slice.call(arguments, 1);
                // 如果给定的结果只有一个，不要再组装成数组
                if (unitResult.length <= 1) {
                    unitResult = unitResult[0];
                }
                result[whichToFill] = unitResult;

                if (workingCount === 0) {
                    jointDeferred[actionType].apply(jointDeferred, result);
                }
            }

            function rejectOne() {
                actionType = 'reject';
                resolveOne.apply(this, arguments);
            }

            for (var i = 0; i < arguments.length; i++) {
                var unit = arguments[i];
                unit.then(
                    util.bindFn(resolveOne, unit, i),
                    util.bindFn(rejectOne, unit, i)
                );
            }

            return jointDeferred.promise();
        };

        /**
         * 返回一个已经处于**resolved**状态的`Promise`对象
         *
         * @param {Any...} 用于调用`resolve`方法的参数
         * @return {Promise} 一个已经处于**resolved**状态的`Promise`对象
         */
        Deferred.resolved = function() {
            var deferred = new Deferred();
            deferred.resolve.apply(deferred, arguments);
            return deferred.promise();
        };

        /**
         * 返回一个已经处于**rejected**状态的`Promise`对象
         *
         * @param {Any...} 用于调用`reject`方法的参数
         * @return {Promise} 一个已经处于**rejected**状态的`Promise`对象
         */
        Deferred.rejected = function() {
            var deferred = new Deferred();
            deferred.reject.apply(deferred, arguments);
            return deferred.promise();
        };

        return Deferred;
    }
);