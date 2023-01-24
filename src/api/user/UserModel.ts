export interface LoginParm {
  username: string;
  password: string;
  code: string
}
export interface LoginResult {
  code: number;
  token: number;
  id: number;
  expireTime: number
}
export interface UserInfo {
  avatar: string;
  id: string;
  introduction: string;
  name: string;
  roles: Array<string>
}
export interface UserListParm {
  deptId: string | number;
  loginName: string;
  currentPage: number;
  pageSize: number;
  total: number;
}
export interface AddUserModel {
  type: string; //判断新增还是编辑
  id: string | number;
  deptId: string | number;
  deptName: string;
  loginName: string;
  mobile: string;
  nickName: string;
  email: string;
  username: string;
  password: string;
  sex: string;
}
export interface AssignRoleListParm {
  userId: string | number;
  currentPage: number;
  pageSize: number;
  total: number;
}
export interface SelectRoleParm {
  roleId: string | number;
  userId: string | number;
}