/**
 * @author Jonathon Hibbard
 * Sigh...
 */

/*!
 * MDN's insurance of Array.map and Array.indexOf
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript
 */
;if(!Array.prototype.map){Array.prototype.map=function(j,k){var q,r,p;if(this==null){throw new TypeError(" this is null or not defined")}var n=Object(this);var m=n.length>>>0;if(typeof j!=="function"){throw new TypeError(j+" is not a function")}if(k){q=k}r=new Array(m);p=0;while(p<m){var o,l;if(p in n){o=n[p];l=j.call(q,o,p,n);r[p]=l}p++}return r}}if(!Array.prototype.indexOf){Array.prototype.indexOf=function(j){if(this==null){throw new TypeError()}var h,f,i=Object(this),g=i.length>>>0;if(g===0){return -1}h=0;if(arguments.length>1){h=Number(arguments[1]);if(h!=h){h=0}else{if(h!=0&&h!=Infinity&&h!=-Infinity){h=(h>0||-1)*Math.floor(Math.abs(h))}}}if(h>=g){return -1}for(f=h>=0?h:Math.max(g-Math.abs(h),0);f<g;f++){if(f in i&&i[f]===j){return f}}return -1}}
/*!
 * Underscorejs Methods and Insurance
 * @see https://github.com/jashkenas/underscore/blob/master/underscore.js and https://github.com/edtsech/underscore.string/blob/master/lib/underscore.string.js
 */
var slice=[].slice,nativeIsArray=Array.isArray;var isArray=nativeIsArray||function(a){return toString.call(a)=="[object Array]"},isString=isString||function(a){return a!=null&&toString.call(a)=="[object String]"},ucfirst=ucfirst||function(a){a=a==null?"":String(a);return a.charAt(0).toUpperCase()+a.slice(1)};
/*!
 * @author Jonathon Hibbard
 * Mock Object
 */
var getComanyInfo=function(){return{employees:[{name:{first:"John",last:"Doe"},department:"Management"},{name:{first:"Bob",last:"Henry"},department:"Sales"}],departmentBuildings:[{name:"Green Acres",departments:["Sales","PR","HR"]},{name:"Pyramid A",departments:["Developers","Management"]}]}};

/*!
 * Begin ITERATIVE Performance Test Methods
 */

var getBuildingName = function(department_name, departmentBuildings) {
  var total_departments, i, departments;

  total_departments = departmentBuildings.length;
  for(i = 0; i < total_departments; i++) {
    departments = departmentBuildings[i].departments;
    if(departments.indexOf(department_name) > -1) {
      return departmentBuildings[i].name;
    }
  }

  return 'UNKNOWN';
},

getEmployeeWithFirstName = function(first_name, employees) {
  var total_employees, i;

  // if(isString(first_name) && employees.length > 0) {
  first_name = first_name;
  total_employees = employees.length;

  for(i = 0; i < total_employees; i++) {
    if(employees[i].name.first == first_name) return employees[i];
  }
  // }

  return null;
},

getEmployeeInfoByFirstName = function(first_name) {
  var EmployeeInfo = {};
  var Company = getComanyInfo();
  var Employee = getEmployeeWithFirstName(first_name, Company.employees);

  // if(Employee && typeof Employee == 'object') {
  EmployeeInfo['name'] = Employee.name.first + " " + Employee.name.last
  EmployeeInfo['department'] = Employee.department;
  EmployeeInfo['building'] = getBuildingName(Employee.department, Company.departmentBuildings);
  // }

  return EmployeeInfo;
};


getEmployeeInfoByFirstName("John");
getEmployeeInfoByFirstName("Bob");


/*!
 * Begin RECURSIVE Performance Test Methods
 */

var getBuildingName = function(department_name, departmentBuildings) {
  var total_departments, i, departments;
  total_departments = departmentBuildings.length;
  for(i = 0; i < total_departments; i++) {
    departments = departmentBuildings[i].departments;
    if(departments.indexOf(department_name) > -1) {
      return departmentBuildings[i].name;
    }
  }

  return 'UNKNOWN';
},

getEmployeeWithFirstName = function(first_name, employees) {
  var total_employees, i;

  // if(isString(first_name) && employees.length > 0) {
  first_name = first_name;
  total_employees = employees.length;

  for(i = 0; i < total_employees; i++) {
    if(employees[i].name.first == first_name) return employees[i];
  }
  // }

  return null;
},

getEmployeeInfoByFirstName = function(first_name) {
  var EmployeeInfo = {};
  var Company = getComanyInfo();
  var Employee = getEmployeeWithFirstName(first_name, Company.employees);

  // if(Employee && typeof Employee == 'object') {
  EmployeeInfo['name'] = Employee.name.first + " " + Employee.name.last
  EmployeeInfo['department'] = Employee.department;
  EmployeeInfo['building'] = getBuildingName(Employee.department, Company.departmentBuildings);
  // }

  return EmployeeInfo;
};