/**
 * 预编译四部曲
 *  1、创建AO对象  Activation Object （执行期上下文）
 *  2、找形参和变量声明，将变量和形参名作为AO属性名，值为 undefined；
 *  3、将实参值和形参值相 统一
 *  4、 在函数体里面找函数声明，值赋予函数体
 */

 /**
  *  由预编译 产生的 ===> 函数声明整体提升     变量   ===> 声明提升
  */

// function fn(a) {
//     console.log(a);

//     var a = 123;

//     console.log(a);

//     function a() { }

//     console.log(a);

//     var b = function () { }

//     console.log(b);

//     function d() { }
// }

// fn(1);
// 预编译发生在函数执行的前一刻

/**
 * 预编译过程
 * 1、创建 AO 对象
 *  AO {
 *     a : undefined  =>  1 => function a() {}   -->  预编译完成，函数执行 => 第一次console.log(a) 从 AO对象中共直接访问是 function a() {} ，第二个console.log(a) ,a 通过 var a = 123，被更改为了  123
 *     b : undefined     --> 预编译完成，函数执行 => function() {}
 *     d : function d() {} -->   预编译完成，函数执行 =>
 *  }
 */

/****************************** 例2 ****************************** */
// function test(a, b) {
//     console.log(a); // 1
//     c = 0;
//     var c;
//     a = 3;
//     console.log (a) // 3
//     b = 2;
//     console.log(b);  // 2
//     function b() { };
//     function d() { };
//     console.log(b);  // 2
// }  

// test(1);

/**
 *  例2 预编译过程
 *  AO {
 *      a : undefined, =>  将实参值和形参值相统一  a的值为 1  -->执行函数，第一个console.log(a) a的值为 1  ，执行到 a = 3时，a的值为3
 *      b : undefined, => 在函数体里面找函数声明，值赋予函数体 --> function b() {} --> 执行函数 执行到 b = 2时， b的值被更改为 2
 *      c : undefined =>    执行函数 c 的值为 0
 *      d :  在函数体里面找函数声明，值赋予函数体 --> function d() {} 
 *  }
 */


/**************************************例3***************************** */
// function test(a, b) {
//     console.log(a);    // function a () {}
//     console.log(b);   // undefined
//     var b = 234;      // b被赋值为 234
//     console.log(b);  // 234
//     a = 123;         // a 被赋值为 123
//     console.log(a);   // 123
//     function a() { }
//     var a;
//     b = 234;      // b被赋值为 234
//     var b = function () { }  // b被 赋值为匿名函数   function () {} 
//     console.log(a);  // 123
//     console.log(b);  //  function () {} 
// }
// test(1);

/**
 * 例3 预编译过程
 *  第一步创建AO 对象
 *  AO {
 *          第二步       第三步      第四步               函数执行                                            a = 123
 *      a: undefined  =>  1  >   function a () {}  --->  console.log(a) 的值为：function a () {}   --->       123
 * 
 *           第二步   第三步 b 没有实参   第四步 没有b相关的函数声明   函数执行                                      b = 234    var b = function () {}
 *      b: undefined                                               console.log(b) 第一次打印b的值是undefined --->  234   --->    function () {}
 *  }
 */


/************************ GO  AO 涉及到全局的预编译************/


/**
 *  预编译 GO  
 *  GO {
 *         预编译             global = 100 
 *      global: undefined  =>   100
 *  }
 *    
 * 
 */
// global = 100;
// function fn() {
//     console.log(global);  // undefined  函数体内有自己的global变量不需要去全局环境中查找， 此时的 global变量 还没有赋值 所以是undefined
//     global = 200;
//     console.log(global); // 200 
//     var global = 300;
//     console.log(global); // 300
// } 

// console.log(global) // 100

// fn();
// var global;  // 声明 是优先级极高的，就算在下面声明，在预编译时 也是先执行的 

/**
 *  预编译 AO 
 *  AO {
 *      global : undefined  ==> 200 ==> 300
 *      
 *  }
 */


/****************************预编译 例4  */
//  GO {
//      a : undefined ==> 10
//      c : 234
//  }

// function test() {
//     console.log(b); // undefined
//     if (a) {  // => 到全局环境中 找 a 此时 a 的值是 undefined
//         var b = 100;
//     }
//     console.log(b) // undefined
//     c = 234;
//     console.log(c); // 234
// }

// var a;
// test();
// // AO {
// //     b : undefined
// // }
// a = 10; // 修改 a 的值 此时 a 的值为 10 
// console.log(c); // 234


/*****************************  百度面试题 ******************************* */
// 第一题
// function bar() {
//     return foo;
//     foo = 10;
//     function foo() { }
//     var foo = 11;
// }
// console.log(bar()); // function foo() { }


// 第二题
console.log(bar()); // 11
function bar() {
    foo = 10;
    function foo() {}
    var foo = 11;
    return foo;
}

// AO {
//     foo : undefined ==>   function foo() {} ==> 10 ==> 11
// }