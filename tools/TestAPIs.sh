## account.js
# add admin
# 590ca817f3e144355c71400e
curl -X POST --data 'name=admin&idNum=123456&password=123456&role=admin' http://localhost:2333/account/register
# add teacher
# 590ca82ef3e144355c71400f
curl -X POST --data 'name=bingzhang&idNum=1&password=123456&role=teacher' http://localhost:2333/account/register
# add student
# 590ca83bf3e144355c714010
curl -X POST --data 'name=david&idNum=2&password=123456' http://localhost:2333/account/register
# change passwd
curl -X PUT --data 'password=111111' http://localhost:2333/account/passwd/590ca817f3e144355c71400e
# login
curl -X POST --data 'username=123456&password=111111' http://localhost:2333/
# del admin
curl -X DELETE http://localhost:2333/account/590ca817f3e144355c71400e



## course.js
# add course
# 590ca866f3e144355c714011
curl -X POST --data 'name=swe&teacher=bingzhang&id=590ca82ef3e144355c71400f' http://localhost:2333/course
# add student
curl -X PUT --data 'stus=[{"name":"david","id":"590ca83bf3e144355c714010"}]' http://localhost:2333/course/590ca866f3e144355c714011/stu
# get course info
curl -X GET http://localhost:2333/course/590ca866f3e144355c714011
# all in one
cour -X GET http://localhost:2333/course/allInOne/590ca866f3e144355c714011


## homework.js
# add homework
# 590ca8cdf3e144355c714014
curl -X POST --data 'name=homework1&courseId=590ca866f3e144355c714011' http://localhost:2333/homework
# get homework
curl -X GET http://localhost:2333/homework/590ca8cdf3e144355c714014
# submit homework
curl -X PUT http://localhost:2333/homework/590ca8cdf3e144355c714014/590c49382bd5550d1ce77b5e
# del homework
curl -X DELETE http://localhost:2333/homework/590ca8cdf3e144355c714014



## discussion.js
# add discussion
curl -X POST --data 'name=david&stuId=590ca83bf3e144355c714010&content=DataForTest' http://localhost:2333/discussion/590ca866f3e144355c714011
# get discussion
curl -X GET http://localhost:2333/discussion/590ca866f3e144355c714011
# delete discussion
curl -X DELETE --data 'index=0' http://localhost:2333/discussion/590ca866f3e144355c714011
