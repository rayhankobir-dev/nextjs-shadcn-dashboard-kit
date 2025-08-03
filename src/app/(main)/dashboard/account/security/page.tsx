import ChangePasswordForm from "./change-password-form";
import LoginActivity from "./login-activity";

function AccountSecurityPage() {
  return (
    <section className="grid gap-14">
      <div className="grid gap-8">
        <div>
          <h2 className="text-xl font-semibold">Change Password</h2>
          <p className="max-w-2xl text-sm">
            Remember, your password is your digital key to your account. Keep it safe, keep it secure!
          </p>
        </div>

        <ChangePasswordForm />
      </div>

      <LoginActivity />
    </section>
  );
}

export default AccountSecurityPage;
