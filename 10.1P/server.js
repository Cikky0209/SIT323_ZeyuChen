const express= require("express");
const res = require("express/lib/response");
const app = express();
const fs = require('fs');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

//Addition
const add= (n1,n2) => {
    return n1 + n2;
}

//Subtraction
const subtract = (n1, n2) => {
  return n1 - n2;
}

//Multiplication
const multiply = (n1, n2) => {
  return n1 * n2;
}

//Division
const divide = (n1, n2) => {
  //Set a error if n2 =0, because no any number can divide by 0
  if (n2 === 0) {
    logger.error("Division by zero error");
    throw new Error("No number can divided by zero, please check and enter n2 again");
  }
  return n1 / n2;
}

//Exponetiation
const exponentiation = (n1, n2) => {
    return Math.pow(n1, n2);
}

//Square root
const suqareRoot = (n) => {
    return Math.sqrt(n);
}

//Modulo operations
const modulo = (n1, n2) => {
    return n1 % n2;
}

//  '+' function
app.get("/add", (req,res)=>{
    try{
      const n1 = parseFloat(req.query.n1);
      const n2 = parseFloat(req.query.n2);
      if(isNaN(n1)) {
          logger.error("n1 is incorrectly defined");
          throw new Error("n1 as the first number inputed is undefined, please enter an number that you want to calculate");
      }
      if(isNaN(n2)) {
          logger.error("n2 is incorrectly defined");
          throw new Error("n2 as the second number inputed is undefined, please enter an number that you want to calculate");
      }
      
      logger.info('Parameters ' + n1 +' and ' + n2+ ' received for addition');
      const result = add(n1,n2);
      //Retrun the status as 200 means success
      res.status(200).json({ statuscocde: 200, data: result }); 
    } catch(error) { 
          console.error(error)
        //Throw an error if there is something went wrong
          res.status(500).json({ statuscocde: 500, msg: error.toString() })
    }
});

//  '-' function
app.get("/subtract", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 as the first number inputed is undefined, please enter an number that you want to calculate");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 as the second number inputed is undefined, please enter an number that you want to calculate");
    }

    logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for subtraction');
    const result = subtract(n1, n2);
    res.status(200).json({ status: 200, data: result});
  } catch (error) {
    console.error(error)
    res.status(500).json({ statuscocde: 500, msg: error.toString() })
  }
});

//  'x' function
app.get("/multiply", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 as the first number inputed is undefined, please enter an number that you want to calculate");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 as the second number inputed is undefined, please enter an number that you want to calculate");
    }

    logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for muliplication');
    const result = multiply(n1, n2);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    console.error(error)
    res.status(500).json({ statuscode: 500, msg: error.toString() })
  }
});

//  '/' function
app.get("/divide", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 as the first number inputed is undefined, please enter an number that you want to calculate");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 as the second number inputed is undefined, please enter an number that you want to calculate");
    }

    logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for division');
    const result = divide(n1, n2);
    res.status(200).json({statuscode: 200, data: result });
  } catch (error) {
    console.error(error)
    res.status(500).json({ statuscode: 500, msg: error.toString() })
  }
});

//  '^' function
app.get("/exponentiation", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 as the first number inputed is undefined, please enter an number that you want to calculate");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 as the second number inputed is undefined, please enter an number that you want to calculate");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for exponentiation');
        const result = exponentiation(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.error(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

//  square root function
app.get("/square-root", (req, res) => {
    try {
        const n = parseFloat(req.query.n);
        if (isNaN(n)) {
            logger.error("n is incorrectly defined");
            throw new Error("n as the number inputed is undefined, please enter an number that you want to calculate");
        }

        logger.info('Parameter ' + n + ' received for square root calculation');
        const result = suqareRoot(n);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.error(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

//  '%' function
app.get("/modulo", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 as the first number inputed is undefined, please enter an number that you want to calculate");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 as the second number inputed is undefined, please enter an number that you want to calculate");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for modulo operation');
        const result = modulo(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.error(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

const port=3040;
app.listen(port,()=> {
    console.log("hello i'm listening to port"+port);
})