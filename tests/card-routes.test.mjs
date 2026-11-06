import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveCard,cardUrl} from '../src/card-routes.js';
test('resolves each direct name route including trailing slash',()=>{
  for(const [slug,key] of [['jinnpha','COO'],['nattapong','PM'],['rannilin','HR']]){
    assert.equal(resolveCard('/'+slug),key);
    assert.equal(resolveCard('/'+slug+'/'),key);
  }
});
test('name routes take precedence and legacy links still resolve',()=>{
  assert.equal(resolveCard('/rannilin','?card=PM'),'HR');
  assert.equal(resolveCard('/','?card=PM'),'PM');
  assert.equal(resolveCard('/unknown'),'COO');
});
test('shareable route removes legacy selector and contact hash',()=>{
  assert.equal(cardUrl('https://example.com/?card=COO#save-contact','HR').href,'https://example.com/rannilin');
});
