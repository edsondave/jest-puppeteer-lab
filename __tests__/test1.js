const timeout = 60000;
const firstNameSample = 'First Name';
const lastNameSample = 'Last Name';
const usernameSample = 'username';
const passwordSample = 'password';

describe(
  '/ (Home Page)',
  () => {
    let page
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
    }, timeout)

    afterAll(async () => {
      await page.close()
    })

    test('should register', async () => {
	  await page.goto('https://angular-6-registration-login-example.stackblitz.io/register');
	  await page.waitFor('#promptToRun');
	  await page.click('#promptToRun>div:nth-child(1)>button:nth-child(2)');
	  await page.waitFor('.jumbotron');
	  await page.type('div.form-group:nth-child(1)>input:nth-child(2)', firstNameSample);
	  await page.type('div.form-group:nth-child(2)>input:nth-child(2)', lastNameSample);
	  await page.type('div.form-group:nth-child(3)>input:nth-child(2)', usernameSample);
	  await page.type('div.form-group:nth-child(4)>input:nth-child(2)', passwordSample);
	  await page.screenshot({path: 'snapshot1.png'});
	  await page.screenshot({path: 'example1.png'});
	  await page.click('button.btn.btn-primary');
	  await global.__BROWSER__.waitForTarget(target => target.url() === 'https://angular-6-registration-login-example.stackblitz.io/login');
    }, timeout)
	
	test('login should fail', async () => {
	  await page.goto('https://angular-6-registration-login-example.stackblitz.io/login');
	  await page.waitFor('.jumbotron');
	  await page.type('div.form-group:nth-child(1)>input:nth-child(2)', usernameSample);
	  await page.type('div.form-group:nth-child(2)>input:nth-child(2)', 'wrong-password');
	  await page.click('button.btn.btn-primary');
	  await page.waitForSelector('.alert');
	  await page.screenshot({path: 'snapshot2.png'});
	  let element = await page.$('.alert');
	  let value = await page.evaluate(el => el.textContent, element);
	  expect(value).toBe('Username or password is incorrect');
    }, timeout)
	
	test('should log in sucessfully', async () => {
	  await page.goto('https://angular-6-registration-login-example.stackblitz.io/login');
	  await page.waitFor('.jumbotron');
	  await page.type('div.form-group:nth-child(1)>input:nth-child(2)', usernameSample);
	  await page.type('div.form-group:nth-child(2)>input:nth-child(2)', passwordSample);
	  await page.screenshot({path: 'example1.png'});
	  await page.click('button.btn.btn-primary');
	  await global.__BROWSER__.waitForTarget(target => target.url() === 'https://angular-6-registration-login-example.stackblitz.io/');
	  await page.screenshot({path: 'snapshot3.png'});
    }, timeout)
	
    test('should delete account and log out', async () => {
	  await page.goto('https://angular-6-registration-login-example.stackblitz.io/');
	  await page.waitFor('.col-sm-6>ng-component:nth-child(3)>ul:nth-child(4)>li:nth-child(1)>a:nth-child(1)');
	  await page.click('.col-sm-6>ng-component:nth-child(3)>ul:nth-child(4)>li:nth-child(1)>a:nth-child(1)');
	  await page.screenshot({path: 'snapshot4.png'});
	  await page.click('.col-sm-6>ng-component:nth-child(3)>p:nth-child(5)>a:nth-child(1)');
    }, timeout)
	
	test('log in should fail', async () => {
	  await page.goto('https://angular-6-registration-login-example.stackblitz.io/login');
	  await page.waitFor('.jumbotron');
	  await page.type('div.form-group:nth-child(1)>input:nth-child(2)', usernameSample);
	  await page.type('div.form-group:nth-child(2)>input:nth-child(2)', passwordSample);
	  await page.screenshot({path: 'example1.png'});
	  await page.click('button.btn.btn-primary');
	  await page.screenshot({path: 'example2.png'});
	  await page.waitForSelector('.alert');
	  let element = await page.$('.alert');
	  let value = await page.evaluate(el => el.textContent, element);
	  expect(value).toBe('Username or password is incorrect');
	  await page.screenshot({path: 'snapshot5.png'});
    }, timeout)
	
  },
  timeout
)
