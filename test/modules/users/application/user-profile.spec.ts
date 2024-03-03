import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { userCreateMother } from "../domain/user.mother"
import { userServiceMock } from "../domain/user.service.mock";
import { userToNewUser } from '../../../../src/modules/users/domain/user';
import { userProfile } from '../../../../src/modules/users/application/profile/profile-user';
import { userProfileMother } from '../domain/user-profile.mother';

describe("UserProfile", () => {

    it("should_successfully_user_profile_change", async () => {
        const profile = userProfileMother();
        const message = MessageCreateMother();
        userServiceMock.updateProfile.mockResolvedValueOnce({ message });
        const expected = await userProfile(userServiceMock)(profile)

        expect(expected.message).toBe(message)
    })

    it("should_successfully_user_profile_to_have_call", async () => {
        const profile = userProfileMother();
        const message = MessageCreateMother();
        userServiceMock.updateProfile.mockResolvedValueOnce({ message });
        await userProfile(userServiceMock)(profile)

        expect(userServiceMock.updateProfile).toHaveBeenCalledWith(profile)
    })

    it("should_failed_user_profile", async () => {
        const profile = userProfileMother();
        const response = new Error(MessageCreateMother());
        userServiceMock.updateProfile.mockRejectedValueOnce(response);
        try {
            await userProfile(userServiceMock)(profile)
            fail("should_failed_user_profile")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }
    })
})