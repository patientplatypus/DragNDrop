
//this works ~
// package com.example.fn;
//
// public class HelloFunction {
//
//     public String handleRequest(String input) {
//         String name = (input == null || input.isEmpty()) ? "world"  : input;
//
//         return "Hello, " + name + "!";
//     }
//
// }


// package com.example.fn;
// import com.fnproject.fn.api.flow.Flow;
// import com.fnproject.fn.api.flow.Flows;
//
// public class HelloFunction {
//
//     public String handleRequest(String input) {
//         Flow fl = Flows.currentFlow();
//         return fl.supply(
//           ()->{
//             String returnVal = "Hello " + input;
//             return returnVal;
//           }
//         )
//         .thenApply(val -> "hey it worked: " + val)
//         .get();
//     }
//
// }


package com.example.fn;

import com.fnproject.fn.api.flow.Flow;
import com.fnproject.fn.api.flow.Flows;

public class HelloFunction {

    public String handleRequest(int x) {

	Flow fl = Flows.currentFlow();

	return fl.completedValue(x)
            .thenApply( i -> i*2 )
	         .thenApply( i -> "Your number is " + i )
	         .get();
    }
}


// package com.example.fn;
//
// import com.fnproject.fn.api.flow.Flow;
// import com.fnproject.fn.api.flow.Flows;
//
// public class PrimeFunction {
//
//     public String handleRequest(int nth) {
//
//         Flow fl = Flows.currentFlow();
//
//         return fl.supply(
//                 () -> {
//                     int num = 1, count = 0, i = 0;
//
//                     while (count < nth) {
//                         num = num + 1;
//                         for (i = 2; i <= num; i++) {
//                             if (num % i == 0) {
//                                 break;
//                             }
//                         }
//                         if (i == num) {
//                             count = count + 1;
//                         }
//                     }
//                     return num;
//                 })
//
//                 .thenApply(i -> "The " + nth + "th prime number is " + i)
//                 .get();
//     }
// }
