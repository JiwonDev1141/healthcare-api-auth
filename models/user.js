import Joi from "joi"

const userSchema = Joi.object({
    userId: Joi.string(),
    userIndex: Joi.number.required(),
    userPw: Joi.string().min(8).max(20),
    userName: Joi.string().max(15).required(),
    mobile: Joi.string().required(),
    isReceiveSMS: Joi.boolean(),
    email: Joi.string().required(),

    // 0: 현장 관리자 (sysadmin)
    // 1: 지역 담당자 (supervisor)
    // 2: 서비스 제공자 (manager)
    // 3: 플랫폼 운영자 (member)
    userRole: Joi.number().integer().min(0).max(3).required(),

    createdAt: Joi.date().default(date.now()).required(),
    updatedAt: Joi.date().required(),
    withdrawnAt: Joi.date().required(),
    isAuthenticated: Joi.boolean().default(false).required(),
    userRank: Joi.string().required(),
    isManager: Joi.boolean(),
    deviceId: Joi.string(), // ObjectId
    birthDate: Joi.date().required(),
    companyId: Joi.string(), // ObjectId
    companyCode: Joi.string(),
    serviceId: Joi.string(), // ObjectId
    serviceCode: Joi.string(),
    group: Joi.array(), // array<objectId> 어떻게 설정하는 지?
    userPhoto: Joi.string().required(),
    use: Joi.boolean().required(),

})