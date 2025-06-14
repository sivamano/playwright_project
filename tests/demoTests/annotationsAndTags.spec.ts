import {test, expect} from '@playwright/test';

//Annotations

test.skip('skip this test', async ({page})=>{

});

test.fixme('still in progress', async({page})=>{

});

test.only('run only this test',async ({page})=>{

});

test('fail this test',async({page})=>{
 test.fail();
});

test('slow test',async ({page})=>{
 test.slow();
});

//Tags
test('open account @smoke', async ({page})=>{

});
