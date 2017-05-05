## account.js
# add admin
# 590c38c63be83f1030aead55
curl -X POST --data 'name=david&idNum=123456&password=123456&role=admin' http://localhost:2333/account/register
# add teacher
# 590c492c2bd5550d1ce77b5d
curl -X POST --data 'name=david&idNum=1&password=123456&role=teacher' http://localhost:2333/account/register
# add student
# 590c49382bd5550d1ce77b5e
curl -X POST --data 'name=david&idNum=2&password=123456' http://localhost:2333/account/register
# change passwd
curl -X PUT --data 'password=111111' http://localhost:2333/account/passwd/590c38c63be83f1030aead55
# login
curl -X POST --data 'username=123456&password=111111' http://localhost:2333/
# del admin
curl -X DELETE http://localhost:2333/account/590c38c63be83f1030aead55



## course.js
# add course
# 590c4cc557dca42424eaa585
curl -X POST --data 'name=swe&teacher=david&id=590c492c2bd5550d1ce77b5d' http://localhost:2333/course
# add student
curl -X PUT --data 'stus=[{"name":"david","id":"590c49382bd5550d1ce77b5e"}]' http://localhost:2333/course/590c4cc557dca42424eaa585/stu
# get course info
curl -X GET http://localhost:2333/course/590c4cc557dca42424eaa585



## homework.js
# add homework
# 590c5a5f0b07aa38ec393ae0
curl -X POST --data 'name=homework&courseId=590c4cc557dca42424eaa585' http://localhost:2333/homework
# get homework
curl -X GET http://localhost:2333/homework/590c5a5f0b07aa38ec393ae0
# submit homework
curl -X PUT http://localhost:2333/homework/590c5a5f0b07aa38ec393ae0/590c49382bd5550d1ce77b5e
# del homework
curl -X DELETE http://localhost:2333/homework/590c5a5f0b07aa38ec393ae0



## discussion.js
# add discussion
curl -X POST --data 'name=david&stuId=590c49382bd5550d1ce77b5e&content=test' http://localhost:2333/discussion/590c4cc557dca42424eaa585
# get discussion
curl -X GET http://localhost:2333/discussion/590c4cc557dca42424eaa585
# delete discussion
curl -X DELETE --data 'index=0' http://localhost:2333/discussion/590c4cc557dca42424eaa585
