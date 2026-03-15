import {UserController} from "@modules/user";

let controller: UserController;

describe("UserController", () => {

  beforeAll(async () => {
    controller = new UserController();
  })

  test("Get All Users", () => {
    expect(controller.getUsers()).toEqual("users");
  })
})

