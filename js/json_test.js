// Protocol Buffers - Google's data interchange format
// Copyright 2008 Google Inc.  All rights reserved.
// https://developers.google.com/protocol-buffers/
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//     * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// Test suite is written using Jasmine -- see http://jasmine.github.io/

goog.setTestOnly();

goog.require('goog.crypt.base64');
goog.require('goog.testing.asserts');
goog.require('proto.google.protobuf.Timestamp');
goog.require('proto.google.protobuf.Duration');
goog.require('proto.google.protobuf.FieldMask');
goog.require('proto.google.protobuf.Int32Value');
goog.require('proto.google.protobuf.UInt32Value');
goog.require('proto.google.protobuf.Int64Value');
goog.require('proto.google.protobuf.UInt64Value');
goog.require('proto.google.protobuf.FloatValue');
goog.require('proto.google.protobuf.DoubleValue');
goog.require('proto.google.protobuf.BoolValue');
goog.require('proto.google.protobuf.StringValue');
goog.require('proto.google.protobuf.BytesValue');
goog.require('proto.google.protobuf.Any');

// CommonJS-LoadFromFile: google-protobuf jspb
goog.require('jspb.Message');

// CommonJS-LoadFromFile: testjson_pb proto.jspb.json_test
goog.require('proto.jspb.json_test.TestAllTypes');
goog.require('proto.jspb.json_test.TestAllTypes.NestedEnum');
goog.require('proto.jspb.json_test.TestMap');
goog.require('proto.jspb.json_test.TestTimestamp');
goog.require('proto.jspb.json_test.TestDuration');
goog.require('proto.jspb.json_test.TestFieldMask');
goog.require('proto.jspb.json_test.TestWrappers');
goog.require('proto.jspb.json_test.TestStruct');
goog.require('proto.jspb.json_test.TestAny');

describe('Canonical JSON test suite', function () {
  function setAllFieldsLow(msg) {
    msg.setOptionalInt32(-2147483648);
    msg.setOptionalInt64("-9223372036854775808");
    msg.setOptionalUint32(1);
    msg.setOptionalUint64("1");
    msg.setOptionalSint32(-2147483648);
    msg.setOptionalSint64("-9223372036854775808");
    msg.setOptionalFixed32(1);
    msg.setOptionalFixed64("1");
    msg.setOptionalSfixed32(-2147483648);
    msg.setOptionalSfixed64("-9223372036854775808");
    msg.setOptionalFloat(-2147483647.5);
    msg.setOptionalDouble(-2147483647.25);
    msg.setOptionalBool(true);
    msg.setOptionalString("Hello world!");
    msg.setOptionalBytes(new Uint8Array([0, 1, 2]));
    msg.setOptionalNestedEnum(proto.jspb.json_test.TestAllTypes.NestedEnum.BAR);
    msg.setOptionalAliasedEnum(proto.jspb.json_test.TestAllTypes.AliasedEnum.ALIAS_BAR);
    var nestedMessage = new proto.jspb.json_test.TestAllTypes.NestedMessage();
    nestedMessage.setValue(100);
    msg.setOptionalNestedMessage(nestedMessage);

    msg.addRepeatedInt32(-2147483647);
    msg.addRepeatedInt64("-9223372036854775807");
    msg.addRepeatedUint32(1);
    msg.addRepeatedUint64(1);
    msg.addRepeatedSint32(-2147483647);
    msg.addRepeatedSint64("-9223372036854775807");
    msg.addRepeatedFixed32(-2147483647);
    msg.addRepeatedFixed64("-9223372036854775807");
    msg.addRepeatedSfixed32(-2147483647);
    msg.addRepeatedSfixed64("-9223372036854775807");
    msg.addRepeatedFloat(-2147483646.5);
    msg.addRepeatedDouble(-2147483646.25);
    msg.addRepeatedBool(true);
    msg.addRepeatedString("Hello world!");
    msg.addRepeatedBytes(new Uint8Array([3, 4, 5]));
    msg.addRepeatedNestedEnum(proto.jspb.json_test.TestAllTypes.NestedEnum.BAR);
    nestedMessage = new proto.jspb.json_test.TestAllTypes.NestedMessage();
    nestedMessage.setValue(100);
    msg.addRepeatedNestedMessage(nestedMessage);

    msg.addRepeatedInt32(-2147483646);
    msg.addRepeatedInt64("-9223372036854775806");
    msg.addRepeatedUint32(2);
    msg.addRepeatedUint64(2);
    msg.addRepeatedSint32(-2147483646);
    msg.addRepeatedSint64("-9223372036854775806");
    msg.addRepeatedFixed32(-2147483646);
    msg.addRepeatedFixed64("-9223372036854775806");
    msg.addRepeatedSfixed32(-2147483646);
    msg.addRepeatedSfixed64("-9223372036854775806");
    msg.addRepeatedFloat(-2147483645.5);
    msg.addRepeatedDouble(Number.NEGATIVE_INFINITY);
    msg.addRepeatedBool(false);
    msg.addRepeatedString("ello world!");
    msg.addRepeatedBytes(new Uint8Array([6, 7, 8]));
    msg.addRepeatedNestedEnum(proto.jspb.json_test.TestAllTypes.NestedEnum.BAZ);
    nestedMessage = new proto.jspb.json_test.TestAllTypes.NestedMessage();
    nestedMessage.setValue(200);
    msg.addRepeatedNestedMessage(nestedMessage);
  }

  function setAllFieldsDefault(msg) {
    msg.setOptionalInt32(0);
    msg.setOptionalInt64(0);
    msg.setOptionalUint32(0);
    msg.setOptionalUint64(0);
    msg.setOptionalSint32(0);
    msg.setOptionalSint64(0);
    msg.setOptionalFixed32(0);
    msg.setOptionalFixed64(0);
    msg.setOptionalSfixed32(0);
    msg.setOptionalSfixed64(0);
    msg.setOptionalFloat(0.0);
    msg.setOptionalDouble(0.0);
    msg.setOptionalBool(false);
    msg.setOptionalString("");
    msg.setOptionalBytes(new Uint8Array([]));
    msg.setOptionalNestedEnum(proto.jspb.json_test.TestAllTypes.NestedEnum.FOO);
    msg.setOptionalAliasedEnum(proto.jspb.json_test.TestAllTypes.AliasedEnum.ALIAS_FOO);
    msg.setOptionalNestedMessage(null);
  }

  function setAllFieldsHigh(msg) {
    msg.setOptionalInt32(2147483647);
    msg.setOptionalInt64("9223372036854775807");
    msg.setOptionalUint32(4294967295);    
    msg.setOptionalUint64("18446744073709551615");
    msg.setOptionalSint32(2147483647);
    msg.setOptionalSint64("9223372036854775807");
    msg.setOptionalFixed32(2147483647);
    msg.setOptionalFixed64("9223372036854775807");
    msg.setOptionalSfixed32(2147483647);
    msg.setOptionalSfixed64("9223372036854775807");
    msg.setOptionalFloat(2147483647.5);
    msg.setOptionalDouble(2147483647.25);
    msg.setOptionalBool(true);
    msg.setOptionalString("Hello world!");
    msg.setOptionalBytes(new Uint8Array([255, 254, 253]));
    msg.setOptionalNestedEnum(proto.jspb.json_test.TestAllTypes.NestedEnum.BAZ);
    msg.setOptionalAliasedEnum(proto.jspb.json_test.TestAllTypes.AliasedEnum.ALIAS_BAZ);
    var nestedMessage = new proto.jspb.json_test.TestAllTypes.NestedMessage();
    nestedMessage.setValue(2147483647);
    msg.setOptionalNestedMessage(nestedMessage);

    msg.addRepeatedInt32(2147483647);
    msg.addRepeatedInt64("9223372036854775807");
    msg.addRepeatedUint32(2147483647);
    msg.addRepeatedUint64("9223372036854775807");
    msg.addRepeatedSint32(2147483647);
    msg.addRepeatedSint64("9223372036854775807");
    msg.addRepeatedFixed32(2147483647);
    msg.addRepeatedFixed64("9223372036854775807");
    msg.addRepeatedSfixed32(2147483647);
    msg.addRepeatedSfixed64("9223372036854775807");
    msg.addRepeatedFloat(2147483646.5);
    msg.addRepeatedDouble(2147483646.25);
    msg.addRepeatedBool(true);
    msg.addRepeatedString("Hello world!");
    msg.addRepeatedBytes(new Uint8Array([254, 253, 252]));
    msg.addRepeatedNestedEnum(proto.jspb.json_test.TestAllTypes.NestedEnum.BAZ);
    nestedMessage = new proto.jspb.json_test.TestAllTypes.NestedMessage();
    nestedMessage.setValue(2147483646);
    msg.addRepeatedNestedMessage(nestedMessage);

    msg.addRepeatedInt32(2147483646);
    msg.addRepeatedInt64("9223372036854775806");
    msg.addRepeatedUint32(2147483646);
    msg.addRepeatedUint64(2147483646);
    msg.addRepeatedSint32(2147483646);
    msg.addRepeatedSint64("9223372036854775806");
    msg.addRepeatedFixed32(2147483646);
    msg.addRepeatedFixed64("9223372036854775806");
    msg.addRepeatedSfixed32(2147483646);
    msg.addRepeatedSfixed64("9223372036854775806");
    msg.addRepeatedFloat(2147483645.5);
    msg.addRepeatedDouble(Number.POSITIVE_INFINITY);
    msg.addRepeatedBool(true);
    msg.addRepeatedString("ello world!");
    msg.addRepeatedBytes(new Uint8Array([252, 251, 250]));
    msg.addRepeatedNestedEnum(proto.jspb.json_test.TestAllTypes.NestedEnum.BAZ);
    nestedMessage = new proto.jspb.json_test.TestAllTypes.NestedMessage();
    nestedMessage.setValue(2147483645);
    msg.addRepeatedNestedMessage(nestedMessage);
  }

  it('test all fields low bound', function () {
    var foo = new proto.jspb.json_test.TestAllTypes();
    setAllFieldsLow(foo);
    var out = foo.toJSONObject();
    assertEquals(-2147483648, out.optionalInt32);
    assertEquals('-9223372036854775808', out.optionalInt64);
    assertEquals(1, out.optionalUint32);
    assertEquals('1', out.optionalUint64);
    assertEquals(-2147483648, out.optionalSint32);
    assertEquals('-9223372036854775808', out.optionalSint64);
    assertEquals(1, out.optionalFixed32);
    assertEquals('1', out.optionalFixed64);
    assertEquals(-2147483648, out.optionalSfixed32);
    assertEquals('-9223372036854775808', out.optionalSfixed64);
    assertEquals(-2147483647.5, out.optionalFloat);
    assertEquals(-2147483647.25, out.optionalDouble);
    assertEquals(true, out.optionalBool);
    assertEquals('Hello world!', out.optionalString);
    assertEquals(goog.crypt.base64.encodeByteArray([0, 1, 2]), out.optionalBytes);
    assertObjectEquals({ "value": 100 }, out.optionalNestedMessage);
    assertEquals("BAR", out.optionalNestedEnum);
    assertEquals("ALIAS_BAR", out.optionalAliasedEnum);
    assertArrayEquals([-2147483647, -2147483646], out.repeatedInt32);
    assertArrayEquals(['-9223372036854775807', '-9223372036854775806'], out.repeatedInt64);
    assertArrayEquals([1, 2], out.repeatedUint32);
    assertArrayEquals(['1', '2'], out.repeatedUint64);
    assertArrayEquals([-2147483647, -2147483646], out.repeatedSint32);
    assertArrayEquals(['-9223372036854775807', '-9223372036854775806'], out.repeatedSint64);
    assertArrayEquals([-2147483647, -2147483646], out.repeatedFixed32);
    assertArrayEquals(['-9223372036854775807', '-9223372036854775806'], out.repeatedFixed64);
    assertArrayEquals([-2147483647, -2147483646], out.repeatedSfixed32);
    assertArrayEquals(['-9223372036854775807', '-9223372036854775806'], out.repeatedSfixed64);
    assertArrayEquals([-2147483646.5, -2147483645.5], out.repeatedFloat);
    assertArrayEquals([-2147483646.25, '-Infinity'], out.repeatedDouble);
    assertArrayEquals([true, false], out.repeatedBool);
    assertArrayEquals(['Hello world!', 'ello world!'], out.repeatedString);
    assertArrayEquals([goog.crypt.base64.encodeByteArray([3, 4, 5]),
    goog.crypt.base64.encodeByteArray([6, 7, 8])], out.repeatedBytes);
    assertArrayEquals([{ "value": 100 }, { "value": 200 }], out.repeatedNestedMessage);
    assertArrayEquals(["BAR", "BAZ"], out.repeatedNestedEnum);
  })

  it('test all fields high bound', function () {
    var foo = new proto.jspb.json_test.TestAllTypes();
    setAllFieldsHigh(foo);
    var out = foo.toJSONObject();
    assertEquals(2147483647, out.optionalInt32);
    assertEquals('9223372036854775807', out.optionalInt64);
    assertEquals(4294967295, out.optionalUint32);
    assertEquals('18446744073709551615', out.optionalUint64);
    assertEquals(2147483647, out.optionalSint32);
    assertEquals('9223372036854775807', out.optionalSint64);
    assertEquals(2147483647, out.optionalFixed32);
    assertEquals('9223372036854775807', out.optionalFixed64);
    assertEquals(2147483647, out.optionalSfixed32);
    assertEquals('9223372036854775807', out.optionalSfixed64);
    assertEquals(2147483647.5, out.optionalFloat);
    assertEquals(2147483647.25, out.optionalDouble);
    assertEquals(true, out.optionalBool);
    assertEquals('Hello world!', out.optionalString);
    assertEquals(goog.crypt.base64.encodeByteArray([255, 254, 253]), out.optionalBytes);
    assertObjectEquals({ "value": 2147483647 }, out.optionalNestedMessage);
    assertEquals("BAZ", out.optionalNestedEnum);
    assertEquals("BAZ", out.optionalAliasedEnum); // NOTE: BAZ wins as it is the last declared ident with a reused value of 2
    assertArrayEquals([2147483647, 2147483646], out.repeatedInt32);
    assertArrayEquals(['9223372036854775807', '9223372036854775806'], out.repeatedInt64);
    assertArrayEquals([2147483647, 2147483646], out.repeatedUint32);
    assertArrayEquals(['9223372036854775807', '2147483646'], out.repeatedUint64);
    assertArrayEquals([2147483647, 2147483646], out.repeatedSint32);
    assertArrayEquals(['9223372036854775807', '9223372036854775806'], out.repeatedSint64);
    assertArrayEquals([2147483647, 2147483646], out.repeatedFixed32);
    assertArrayEquals(['9223372036854775807', '9223372036854775806'], out.repeatedFixed64);
    assertArrayEquals([2147483647, 2147483646], out.repeatedSfixed32);
    assertArrayEquals(['9223372036854775807', '9223372036854775806'], out.repeatedSfixed64);
    assertArrayEquals([2147483646.5, 2147483645.5], out.repeatedFloat);
    assertArrayEquals([2147483646.25, 'Infinity'], out.repeatedDouble);
    assertArrayEquals([true, true], out.repeatedBool);
    assertArrayEquals(['Hello world!', 'ello world!'], out.repeatedString);
    assertArrayEquals([goog.crypt.base64.encodeByteArray([254, 253, 252]),
    goog.crypt.base64.encodeByteArray([252, 251, 250])], out.repeatedBytes);
    assertArrayEquals([{ "value": 2147483646 }, { "value": 2147483645 }], out.repeatedNestedMessage);
    assertArrayEquals(["BAZ", "BAZ"], out.repeatedNestedEnum);
  })

  it('test all fields with defaults - includeDefaults = false', function () {
    var foo = new proto.jspb.json_test.TestAllTypes();
    setAllFieldsDefault(foo);
    var out = foo.toJSONObject();
    assertArrayEquals([], Object.keys(out));
  })

  it('test special float values', function () {
    var foo = new proto.jspb.json_test.TestAllTypes();
    foo.setOptionalDouble(Number.NaN);
    foo.addRepeatedDouble(Number.NaN);
    foo.addRepeatedDouble(Number.NEGATIVE_INFINITY);
    foo.addRepeatedDouble(Number.POSITIVE_INFINITY);
    var out = foo.toJSONObject();
    assertEquals('NaN', out.optionalDouble);
    assertArrayEquals(['NaN', '-Infinity', 'Infinity'], out.repeatedDouble);
  })

  it('test unknown enum values', function () {
    var foo = new proto.jspb.json_test.TestAllTypes();
    foo.setOptionalNestedEnum(12345);
    foo.addRepeatedNestedEnum(12345);
    foo.addRepeatedNestedEnum(0);
    var out = foo.toJSONObject();
    assertEquals(12345, out.optionalNestedEnum);
    assertArrayEquals([12345, 'FOO'], out.repeatedNestedEnum);
    // todo(amarkowitz): test enum map
  })

  it('test all fields with defaults - includeDefaults = true', function () {
    var foo = new proto.jspb.json_test.TestAllTypes();
    setAllFieldsDefault(foo);
    var out = foo.toJSONObject(true);
    assertEquals(0, out.optionalInt32);
    assertEquals('0', out.optionalInt64);
    assertEquals(0, out.optionalUint32);
    assertEquals('0', out.optionalUint64);
    assertEquals(0, out.optionalSint32);
    assertEquals('0', out.optionalSint64);
    assertEquals(0, out.optionalFixed32);
    assertEquals('0', out.optionalFixed64);
    assertEquals(0, out.optionalSfixed32);
    assertEquals('0', out.optionalSfixed64);
    assertEquals(0, out.optionalFloat);
    assertEquals(0, out.optionalDouble);
    assertEquals(false, out.optionalBool);
    assertEquals('', out.optionalString);
    assertEquals(goog.crypt.base64.encodeByteArray([]), out.optionalBytes);
    assertObjectEquals(null, out.optionalNestedMessage);
    assertEquals(null, out.optionalNestedEnum);
    assertEquals(null, out.optionalAliasedEnum);
    assertArrayEquals([], out.repeatedInt32);
    assertArrayEquals([], out.repeatedInt64);
    assertArrayEquals([], out.repeatedUint32);
    assertArrayEquals([], out.repeatedUint64);
    assertArrayEquals([], out.repeatedSint32);
    assertArrayEquals([], out.repeatedSint64);
    assertArrayEquals([], out.repeatedFixed32);
    assertArrayEquals([], out.repeatedFixed64);
    assertArrayEquals([], out.repeatedSfixed32);
    assertArrayEquals([], out.repeatedSfixed64);
    assertArrayEquals([], out.repeatedFloat);
    assertArrayEquals([], out.repeatedDouble);
    assertArrayEquals([], out.repeatedBool);
    assertArrayEquals([], out.repeatedString);
    assertArrayEquals([], out.repeatedBytes);
    assertArrayEquals([], out.repeatedNestedMessage);
    assertArrayEquals([], out.repeatedNestedEnum);
  })

  it('test maps', function () {
    var foo = new proto.jspb.json_test.TestMap();

    foo.getInt32ToInt32MapMap().set(1, 10);
    foo.getInt64ToInt32MapMap().set('1234567890123456789', 10);
    foo.getUint32ToInt32MapMap().set(2, 10);
    foo.getUint64ToInt32MapMap().set('2234567890123456789', 10);
    foo.getSint32ToInt32MapMap().set(3, 30);
    foo.getSint64ToInt32MapMap().set('3234567890123456789', 30);
    foo.getFixed32ToInt32MapMap().set(4, 40);
    foo.getFixed64ToInt32MapMap().set('4234567890123456789', 40);
    foo.getSfixed32ToInt32MapMap().set(5, 50);
    foo.getSfixed64ToInt32MapMap().set('5234567890123456789', 50);
    foo.getBoolToInt32MapMap().set(false, 6);
    foo.getStringToInt32MapMap().set("Hello", 10);

    foo.getInt32ToInt64MapMap().set(1, '1234567890123456789');
    foo.getInt32ToUint32MapMap().set(2, 20);
    foo.getInt32ToUint64MapMap().set(2, '2234567890123456789');
    foo.getInt32ToSint32MapMap().set(3, 30);
    foo.getInt32ToSint64MapMap().set(3, '3234567890123456789');
    foo.getInt32ToFixed32MapMap().set(4, 40);
    foo.getInt32ToFixed64MapMap().set(4, '4234567890123456789');
    foo.getInt32ToSfixed32MapMap().set(5, 50);
    foo.getInt32ToSfixed64MapMap().set(5, '5234567890123456789');
    foo.getInt32ToFloatMapMap().set(6, 1.5);
    foo.getInt32ToDoubleMapMap().set(6, 1.25);
    foo.getInt32ToBoolMapMap().set(7, false);
    foo.getInt32ToStringMapMap().set(7, "World");
    foo.getInt32ToBytesMapMap().set(8, goog.crypt.base64.encodeByteArray([1, 2, 3]));
    var nestedMessage = new proto.jspb.json_test.TestAllTypes.NestedMessage();
    nestedMessage.setValue(1234);
    foo.getInt32ToMessageMapMap().set(8, nestedMessage);
    foo.getInt32ToEnumMapMap().set(9, proto.jspb.json_test.TestAllTypes.NestedEnum.BAR);

    var out = foo.toJSONObject();
    assertObjectEquals({ '1': 10 }, out.int32ToInt32Map);
    assertObjectEquals({ '1234567890123456789': 10 }, out.int64ToInt32Map);
    assertObjectEquals({ 2: 10 }, out.uint32ToInt32Map);
    assertObjectEquals({ '2234567890123456789': 10 }, out.uint64ToInt32Map);
    assertObjectEquals({ 3: 30 }, out.sint32ToInt32Map);
    assertObjectEquals({ '3234567890123456789': 30 }, out.sint64ToInt32Map);
    assertObjectEquals({ 4: 40 }, out.fixed32ToInt32Map);
    assertObjectEquals({ '4234567890123456789': 40 }, out.fixed64ToInt32Map);
    assertObjectEquals({ 5: 50 }, out.sfixed32ToInt32Map);
    assertObjectEquals({ '5234567890123456789': 50 }, out.sfixed64ToInt32Map);
    assertObjectEquals({ false: 6 }, out.boolToInt32Map);
    assertObjectEquals({ false: 6 }, out.boolToInt32Map);

    assertObjectEquals({ "Hello": 10 }, out.stringToInt32Map);

    assertObjectEquals({ 1: '1234567890123456789' }, out.int32ToInt64Map);
    assertObjectEquals({ 2: 20 }, out.int32ToUint32Map);
    assertObjectEquals({ 2: '2234567890123456789' }, out.int32ToUint64Map);
    assertObjectEquals({ 3: '3234567890123456789' }, out.int32ToSint64Map);
    assertObjectEquals({ 4: '4234567890123456789' }, out.int32ToFixed64Map);
    assertObjectEquals({ 5: 50 }, out.int32ToSfixed32Map);
    assertObjectEquals({ 5: '5234567890123456789' }, out.int32ToSfixed64Map);
    assertObjectEquals({ 6: 1.25 }, out.int32ToDoubleMap);
    assertObjectEquals({ 7: false }, out.int32ToBoolMap);
    assertObjectEquals({ 7: "World" }, out.int32ToStringMap);
    assertObjectEquals({ 8: goog.crypt.base64.encodeByteArray([1, 2, 3]) }, out.int32ToBytesMap);
    assertObjectEquals({ 8: { 'value': 1234 } }, out.int32ToMessageMap);
    assertObjectEquals({ 9: 'BAR' }, out.int32ToEnumMap);

    // Test multiple entries.
    foo = new proto.jspb.json_test.TestMap();
    foo.getInt32ToInt32MapMap().set(1, 2);
    foo.getInt32ToInt32MapMap().set(3, 4);
    out = foo.toJSONObject();

    assertObjectEquals({ 1: 2, 3: 4 }, out.int32ToInt32Map);
  })

  it('timestamps', function() {
    var foo = new proto.jspb.json_test.TestTimestamp();
    var dt = new Date();
    var protoDate = proto.google.protobuf.Timestamp.fromDate(dt);
    foo.setTimestampValue(protoDate);
    var out = foo.toJSONObject();

    assertObjectEquals({"timestampValue": dt.toISOString() }, out);
  })

  describe('duration', function() {
    it('empty', function() {
      var foo = new proto.jspb.json_test.TestDuration();
      foo.setDurationValue(new proto.google.protobuf.Duration());
      var out = foo.toJSONObject();
      assertObjectEquals({"durationValue": "0s"}, out);
    })

    it('seconds + nanos', function() {
      var foo = new proto.jspb.json_test.TestDuration();
      foo.setDurationValue(new proto.google.protobuf.Duration([1234, 5678]));
      var out = foo.toJSONObject();
      assertObjectEquals({"durationValue": "1234.000005678s"}, out);
    })

    it('seconds + negative nanos', function() {
      var foo = new proto.jspb.json_test.TestDuration();
      foo.setDurationValue(new proto.google.protobuf.Duration([1234, -5678]));
      var out = foo.toJSONObject();
      assertObjectEquals({"durationValue": "1233.999994322s"}, out);
    })

    it('seconds', function() {
      var foo = new proto.jspb.json_test.TestDuration();
      foo.setDurationValue(new proto.google.protobuf.Duration([1234, 0]));
      var out = foo.toJSONObject();
      assertObjectEquals({"durationValue": "1234s"}, out);
    })

    it('nanos', function() {
      var foo = new proto.jspb.json_test.TestDuration();
      foo.setDurationValue(new proto.google.protobuf.Duration([0, 5678]));
      var out = foo.toJSONObject();
      assertObjectEquals({"durationValue": "0.000005678s"}, out);
    })
  })

  it('field mask', function() {
    var foo = new proto.jspb.json_test.TestFieldMask();
    var mask = new proto.google.protobuf.FieldMask();
    mask.addPaths('foo.bar');
    mask.addPaths('baz');
    mask.addPaths('foo_bar.baz');
    foo.setFieldMaskValue(mask);
    var out = foo.toJSONObject();

    assertObjectEquals({"fieldMaskValue": "foo.bar,baz,foo_bar.baz" }, out);
  })

  describe('wrappers', function() {
    it('BoolValue', function() {
      var foo = new proto.jspb.json_test.TestWrappers();
      foo.setBoolValue(new proto.google.protobuf.BoolValue([false]));
      var out = foo.toJSONObject();
      assertObjectEquals({"boolValue": false }, out);

      foo.setBoolValue(new proto.google.protobuf.BoolValue([true]));
      out = foo.toJSONObject();
      assertObjectEquals({"boolValue": true }, out);
    })

    it('Int32Value', function() {
      var foo = new proto.jspb.json_test.TestWrappers();
      foo.setInt32Value(new proto.google.protobuf.Int32Value([0]));
      var out = foo.toJSONObject();
      assertObjectEquals({"int32Value": 0 }, out);

      foo.setInt32Value(new proto.google.protobuf.Int32Value([2147483647]));
      out = foo.toJSONObject();
      assertObjectEquals({"int32Value": 2147483647 }, out);

      foo.setInt32Value(new proto.google.protobuf.Int32Value([-2147483648]));
      out = foo.toJSONObject();
      assertObjectEquals({"int32Value": -2147483648 }, out);
    })

    it('UInt32Value', function() {
      var foo = new proto.jspb.json_test.TestWrappers();
      foo.setUint32Value(new proto.google.protobuf.UInt32Value([0]));
      var out = foo.toJSONObject();
      assertObjectEquals({"uint32Value": 0 }, out);

      foo.setUint32Value(new proto.google.protobuf.UInt32Value([4294967295]));
      out = foo.toJSONObject();
      assertObjectEquals({"uint32Value": 4294967295 }, out);
    })

    it('Int64Value', function() {
      var foo = new proto.jspb.json_test.TestWrappers();
      var val = new proto.google.protobuf.Int64Value();

      val.setValue('9223372036854775807');
      foo.setInt64Value(val);
      out = foo.toJSONObject();
      assertObjectEquals({"int64Value": "9223372036854775807" }, out);

      foo.setInt64Value(new proto.google.protobuf.Int64Value(['-9223372036854775808']));
      out = foo.toJSONObject();
      assertObjectEquals({"int64Value": "-9223372036854775808" }, out);
    })

    it('UInt64Value', function() {
      var foo = new proto.jspb.json_test.TestWrappers();
      foo.setUint64Value(new proto.google.protobuf.UInt64Value(['18446744073709551615']));
      var out = foo.toJSONObject();
      assertObjectEquals({"uint64Value": "18446744073709551615" }, out);
    })

    it('FloatValue', function() {
      var foo = new proto.jspb.json_test.TestWrappers();
      foo.setFloatValue(new proto.google.protobuf.FloatValue([0.0]));
      var out = foo.toJSONObject();
      assertObjectEquals({"floatValue": 0 }, out);

      foo.setFloatValue(new proto.google.protobuf.FloatValue([-2147483647.5]));
      out = foo.toJSONObject();
      assertObjectEquals({"floatValue": -2147483647.5 }, out);

      foo.setFloatValue(new proto.google.protobuf.FloatValue([2147483646.5]));
      out = foo.toJSONObject();
      assertObjectEquals({"floatValue": 2147483646.5 }, out);

      foo.setFloatValue(new proto.google.protobuf.FloatValue([Number.NEGATIVE_INFINITY]));
      out = foo.toJSONObject();
      assertObjectEquals({"floatValue": "-Infinity" }, out);

      foo.setFloatValue(new proto.google.protobuf.FloatValue([Number.POSITIVE_INFINITY]));
      out = foo.toJSONObject();
      assertObjectEquals({"floatValue": "Infinity" }, out);

      foo.setFloatValue(new proto.google.protobuf.FloatValue([Number.NaN]));
      out = foo.toJSONObject();
      assertObjectEquals({"floatValue": "NaN" }, out);
    })

    it('DoubleValue', function() {
      var foo = new proto.jspb.json_test.TestWrappers();
      foo.setDoubleValue(new proto.google.protobuf.DoubleValue([0.0]));
      var out = foo.toJSONObject();
      assertObjectEquals({"doubleValue": 0 }, out);

      foo.setDoubleValue(new proto.google.protobuf.DoubleValue([-2147483647.5]));
      out = foo.toJSONObject();
      assertObjectEquals({"doubleValue": -2147483647.5 }, out);

      foo.setDoubleValue(new proto.google.protobuf.DoubleValue([2147483646.5]));
      out = foo.toJSONObject();
      assertObjectEquals({"doubleValue": 2147483646.5 }, out);

      foo.setDoubleValue(new proto.google.protobuf.DoubleValue([Number.NEGATIVE_INFINITY]));
      out = foo.toJSONObject();
      assertObjectEquals({"doubleValue": "-Infinity" }, out);

      foo.setDoubleValue(new proto.google.protobuf.DoubleValue([Number.POSITIVE_INFINITY]));
      out = foo.toJSONObject();
      assertObjectEquals({"doubleValue": "Infinity" }, out);

      foo.setDoubleValue(new proto.google.protobuf.DoubleValue([Number.NaN]));
      out = foo.toJSONObject();
      assertObjectEquals({"doubleValue": "NaN" }, out);
    })

    it('StringValue', function() {
      var foo = new proto.jspb.json_test.TestWrappers();
      foo.setStringValue(new proto.google.protobuf.StringValue([""]));
      var out = foo.toJSONObject();
      assertObjectEquals({"stringValue": "" }, out);

      foo.setStringValue(new proto.google.protobuf.StringValue(["hello world"]));
      out = foo.toJSONObject();
      assertObjectEquals({"stringValue": "hello world" }, out);
    })

    it('BytesValue', function() {
      var foo = new proto.jspb.json_test.TestWrappers();
      foo.setBytesValue(new proto.google.protobuf.BytesValue([new Uint8Array([])]));
      var out = foo.toJSONObject();      
      assertObjectEquals({"bytesValue": goog.crypt.base64.encodeByteArray([]) }, out);

      foo.setBytesValue(new proto.google.protobuf.BytesValue([new Uint8Array([252, 251, 250])]));
      out = foo.toJSONObject();      
      assertObjectEquals({"bytesValue": goog.crypt.base64.encodeByteArray([252, 251, 250]) }, out);
    })
  })

  describe('Struct', function() {
    it('set struct', function() {
      var foo = new proto.jspb.json_test.TestStruct();
      var struct = new proto.google.protobuf.Struct();
      var val = new proto.google.protobuf.Value();
      val.setNullValue(proto.google.protobuf.NullValue.NULL_VALUE);
      struct.getFieldsMap().set('null_value', val);
      val = new proto.google.protobuf.Value();
      val.setNumberValue(1.25);
      struct.getFieldsMap().set('number_value', val);
      val = new proto.google.protobuf.Value();
      val.setStringValue('hello');
      struct.getFieldsMap().set('string_value', val);
      subStruct = new proto.google.protobuf.Struct();
      val = new proto.google.protobuf.Value();
      val.setNumberValue(1234);
      subStruct.getFieldsMap().set('number_value', val);
      val = new proto.google.protobuf.Value();
      val.setStructValue(subStruct);
      struct.getFieldsMap().set('struct_value', val);
      val = new proto.google.protobuf.Value();
      val.setStructValue(struct);

      var valList = new proto.google.protobuf.ListValue();
      val = new proto.google.protobuf.Value();
      val.setNumberValue(1.125);
      valList.addValues(val);
      val = new proto.google.protobuf.Value();
      val.setNullValue(proto.google.protobuf.NullValue.NULL_VALUE);
      valList.addValues(val);
      struct.getFieldsMap().set('list_value', valList);
      foo.setStructValue(struct);
      var out = foo.toJSONObject();
      assertObjectEquals({
        structValue: {
          null_value: null,
          number_value: 1.25,
          string_value: "hello",
          struct_value: {
            number_value: 1234.0
          },
          list_value: [1.125, null]
        }
      }, out);
    })

    it('set value', function() {
      var foo = new proto.jspb.json_test.TestStruct();
      var val = new proto.google.protobuf.Value();
      val.setNullValue(proto.google.protobuf.NullValue.NULL_VALUE);
      foo.setValue(val);
      var out = foo.toJSONObject();
      assertObjectEquals({
        value: null
      }, out);
    })

    it('set list value', function() {
      var foo = new proto.jspb.json_test.TestStruct();
      var valList = new proto.google.protobuf.ListValue();
      var val = new proto.google.protobuf.Value();
      val.setNumberValue(31831.125);
      valList.addValues(val);
      val = new proto.google.protobuf.Value();
      val.setNullValue(proto.google.protobuf.NullValue.NULL_VALUE);
      valList.addValues(val);
      foo.setListValue(valList);
      var out = foo.toJSONObject();
      assertObjectEquals({
        listValue: [31831.125, null]
      }, out);
    })
  })

  describe('Any', function() {
    function put(val) {
      console.log(JSON.stringify(val, null, 2));
    }

    it('with primitive value', function() {
    })

    it('with default value', function() {
      var msg = new proto.jspb.json_test.TestAny();
      var val = new proto.google.protobuf.Any();
      msg.setAnyValue(val);
      var out = msg.toJSONObject();
      assertObjectEquals({ anyValue: {}}, out);
    })

    it('with Any value', function() {
      var val = new proto.jspb.json_test.TestAllTypes();
      val.setOptionalInt32(1234);
      var anyInner = new proto.google.protobuf.Any();
      anyInner.packJSON(val, 'json_test.TestAllTypes');
      var anyOuter = new proto.google.protobuf.Any();
      anyOuter.packJSON(anyInner, 'google.protobuf.Any')
    
      var out = anyOuter.toJSONObject();
      assertObjectEquals({
        '@type': 'type.googleapis.com/google.protobuf.Any',
        value: {
          "@type": "type.googleapis.com/json_test.TestAllTypes",
          "optionalInt32": 1234
        }
      }, out);
    })

    describe('with wrapper', function() {
      it('Int32Value', function() {
        var val = new proto.google.protobuf.Int32Value([12345]);
        var any = new proto.google.protobuf.Any();
        any.packJSON(val, 'google.protobuf.Int32Value');
  
        var out = any.toJSONObject();
        assertObjectEquals({
          "@type": "type.googleapis.com/google.protobuf.Int32Value",
          "value": 12345
        }, out);
      })

      it('UInt32Value', function() {
        var val = new proto.google.protobuf.UInt32Value([12345]);
        var any = new proto.google.protobuf.Any();
        any.packJSON(val, 'google.protobuf.UInt32Value');
  
        var out = any.toJSONObject();
        assertObjectEquals({
          "@type": "type.googleapis.com/google.protobuf.UInt32Value",
          "value": 12345
        }, out);
      })

      it('Int64Value', function() {
        var val = new proto.google.protobuf.Int64Value([12345]);
        var any = new proto.google.protobuf.Any();
        any.packJSON(val, 'google.protobuf.Int64Value');
  
        var out = any.toJSONObject();
        assertObjectEquals({
          "@type": "type.googleapis.com/google.protobuf.Int64Value",
          "value": "12345"
        }, out);
      })

      it('UInt64Value', function() {
        var val = new proto.google.protobuf.UInt64Value([12345]);
        var any = new proto.google.protobuf.Any();
        any.packJSON(val, 'google.protobuf.UInt64Value');
  
        var out = any.toJSONObject();
        assertObjectEquals({
          "@type": "type.googleapis.com/google.protobuf.UInt64Value",
          "value": "12345"
        }, out);
      })

      it('FloatValue', function() {
        var val = new proto.google.protobuf.FloatValue([12345]);
        var any = new proto.google.protobuf.Any();
        any.packJSON(val, 'google.protobuf.FloatValue');
  
        var out = any.toJSONObject();
        assertObjectEquals({
          "@type": "type.googleapis.com/google.protobuf.FloatValue",
          "value": 12345.0
        }, out);
      })

      it('DoubleValue', function() {
        var val = new proto.google.protobuf.DoubleValue([12345]);
        var any = new proto.google.protobuf.Any();
        any.packJSON(val, 'google.protobuf.DoubleValue');
  
        var out = any.toJSONObject();
        assertObjectEquals({
          "@type": "type.googleapis.com/google.protobuf.DoubleValue",
          "value": 12345.0
        }, out);
      })

      it('BoolValue', function() {
        var val = new proto.google.protobuf.BoolValue([true]);
        var any = new proto.google.protobuf.Any();
        any.packJSON(val, 'google.protobuf.BoolValue');
  
        var out = any.toJSONObject();
        assertObjectEquals({
          "@type": "type.googleapis.com/google.protobuf.BoolValue",
          "value": true
        }, out);
      })

      it('StringValue', function() {
        var val = new proto.google.protobuf.StringValue(["hello"]);
        var any = new proto.google.protobuf.Any();
        any.packJSON(val, 'google.protobuf.StringValue');
  
        var out = any.toJSONObject();
        assertObjectEquals({
          "@type": "type.googleapis.com/google.protobuf.StringValue",
          "value": "hello"
        }, out);
      })

      it('BytesValue', function() {
        var val = new proto.google.protobuf.BytesValue([new Uint8Array([0, 1, 2])]);
        var any = new proto.google.protobuf.Any();
        any.packJSON(val, 'google.protobuf.BytesValue');
  
        var out = any.toJSONObject();
        assertObjectEquals({
          "@type": "type.googleapis.com/google.protobuf.BytesValue",
          "value": goog.crypt.base64.encodeByteArray([0, 1, 2])
        }, out);
      })
    })

    it('with timestamp value', function() {
      var any = new proto.google.protobuf.Any();
      var dt = new Date();
      var protoDate = proto.google.protobuf.Timestamp.fromDate(dt);
      any.packJSON(protoDate, 'google.protobuf.Timestamp');

      var out = any.toJSONObject();
      assertObjectEquals({
        "@type": "type.googleapis.com/google.protobuf.Timestamp",
        "value": dt.toISOString()
      }, out);
    })

    it('with duration value', function() {
      var any = new proto.google.protobuf.Any();
      var duration = new proto.google.protobuf.Duration([1234, 5678])
      any.packJSON(duration, 'google.protobuf.Duration');

      var out = any.toJSONObject();
      assertObjectEquals({
        "@type": "type.googleapis.com/google.protobuf.Duration",
        "value": "1234.000005678s"
      }, out);
    })

    it('with field mask value', function() {
      var any = new proto.google.protobuf.Any();
      var mask = new proto.google.protobuf.FieldMask();
      mask.addPaths('foo.bar');
      mask.addPaths('baz');
      mask.addPaths('foo_bar.baz');
      any.packJSON(mask, 'google.protobuf.FieldMask');

      var out = any.toJSONObject();
      assertObjectEquals({
        "@type": "type.googleapis.com/google.protobuf.FieldMask",
        "value": "foo.bar,baz,foo_bar.baz"
      }, out);
    })

    it('with struct value', function() {
      var foo = new proto.jspb.json_test.TestStruct();
      var val = new proto.google.protobuf.Value();
      val.setNullValue(proto.google.protobuf.NullValue.NULL_VALUE);
      foo.setValue(val);
      var out = foo.toJSONObject();
      assertObjectEquals({
        value: null
      }, out);

      var any = new proto.google.protobuf.Any();
      var struct = new proto.google.protobuf.Struct();
      var val = new proto.google.protobuf.Value();
      val.setNumberValue(1.125);
      struct.getFieldsMap().set('number', val);
      any.packJSON(struct, 'google.protobuf.Struct');

      var out = any.toJSONObject();
      assertObjectEquals({
        "@type": "type.googleapis.com/google.protobuf.Struct",
        "value": {
          "number": 1.125
        }
      }, out);
    })

    it('with value (number type) value', function() {
      var val = new proto.google.protobuf.Value();
      val.setNumberValue(1);
      var any = new proto.google.protobuf.Any();
      any.packJSON(val, 'google.protobuf.Value');

      var out = any.toJSONObject();
      assertObjectEquals({
        '@type': 'type.googleapis.com/google.protobuf.Value',
        value: 1
      }, out);
    })

    it('with value (null type) value', function() {
      var val = new proto.google.protobuf.Value();
      val.setNullValue(proto.google.protobuf.NullValue.NULL_VALUE);
      var any = new proto.google.protobuf.Any();
      any.packJSON(val, 'google.protobuf.Value');

      var out = any.toJSONObject();
      assertObjectEquals({
        '@type': 'type.googleapis.com/google.protobuf.Value',
        value: null
      }, out);
    })

    it('in maps', function() {      
      var msg = new proto.jspb.json_test.TestAny();
      var val = new proto.google.protobuf.Int32Value([123]);
      var any = new proto.google.protobuf.Any();
      any.packJSON(val, 'google.protobuf.Int32Value');
      msg.getAnyMapMap().set("int32_wrapper", any);

      val = new proto.google.protobuf.Int64Value([456]);
      any = new proto.google.protobuf.Any();
      any.packJSON(val, 'google.protobuf.Int64Value');
      msg.getAnyMapMap().set("int64_wrapper", any);

      var dt = new Date();
      val = proto.google.protobuf.Timestamp.fromDate(dt);      
      any = new proto.google.protobuf.Any();
      any.packJSON(val, 'google.protobuf.Timestamp');
      msg.getAnyMapMap().set("timestamp", any);

      val = new proto.google.protobuf.Duration([1234, 5678]);
      any = new proto.google.protobuf.Any();
      any.packJSON(val, 'google.protobuf.Duration');
      msg.getAnyMapMap().set("duration", any);

      val = new proto.google.protobuf.FieldMask();
      val.addPaths('foo.bar');
      val.addPaths('baz');
      any = new proto.google.protobuf.Any();
      any.packJSON(val, 'google.protobuf.FieldMask');
      msg.getAnyMapMap().set("field_mask", any);

      var struct = new proto.google.protobuf.Struct();

      val = new proto.google.protobuf.Value();
      val.setNumberValue(1.125);
      struct.getFieldsMap().set('number', val);
      any = new proto.google.protobuf.Any();

      any.packJSON(struct, 'google.protobuf.Struct');
      msg.getAnyMapMap().set("struct", any);

      val = new proto.google.protobuf.Value();
      val.setNullValue(proto.google.protobuf.NullValue.NULL_VALUE);

      var valList = new proto.google.protobuf.ListValue();
      val = new proto.google.protobuf.Value();
      val.setNumberValue(1.125);
      valList.addValues(val);
      val = new proto.google.protobuf.Value();
      val.setNullValue(proto.google.protobuf.NullValue.NULL_VALUE);
      valList.addValues(val);
      any = new proto.google.protobuf.Any();
      any.packJSON(valList, 'google.protobuf.ListValue');
      msg.getAnyMapMap().set("list_value", any);

      val = new proto.google.protobuf.Value();
      val.setNumberValue(1.125);
      any = new proto.google.protobuf.Any();
      any.packJSON(val, 'google.protobuf.Value');
      msg.getAnyMapMap().set("number_value", any);

      val = new proto.google.protobuf.Value();
      val.setNumberValue(1.125);
      any = new proto.google.protobuf.Any();
      any.packJSON(val, 'google.protobuf.Value');
      var anyAny = new proto.google.protobuf.Any();
      anyAny.packJSON(any, 'google.protobuf.Any');
      msg.getAnyMapMap().set("any_value_number", anyAny);

      any = new proto.google.protobuf.Any();
      anyAny = new proto.google.protobuf.Any();
      anyAny.packJSON(any, 'google.protobuf.Any');
      msg.getAnyMapMap().set("any_value_default", anyAny);

      any = new proto.google.protobuf.Any();
      msg.getAnyMapMap().set("default", any);

      var out = msg.toJSONObject();
      assertObjectEquals({
        anyMap: {
          int32_wrapper: {
            '@type': 'type.googleapis.com/google.protobuf.Int32Value',
            value: 123
          },
          int64_wrapper: {
            '@type': 'type.googleapis.com/google.protobuf.Int64Value',
            value: "456"
          },
          timestamp: {
            '@type': 'type.googleapis.com/google.protobuf.Timestamp',
            value: dt.toISOString()
          },
          duration: {
            '@type': 'type.googleapis.com/google.protobuf.Duration',
            value: "1234.000005678s"
          },
          field_mask: {
            '@type': 'type.googleapis.com/google.protobuf.FieldMask',
            value: "foo.bar,baz"
          },
          struct: {
            '@type': 'type.googleapis.com/google.protobuf.Struct',
            value: {
              number: 1.125
            }
          },
          list_value: {
            '@type': 'type.googleapis.com/google.protobuf.ListValue',
            value: [1.125, null]
          },
          number_value: {
            '@type': 'type.googleapis.com/google.protobuf.Value',
            value: 1.125
          },
          any_value_number: {
            '@type': 'type.googleapis.com/google.protobuf.Any',
            value: {
              '@type': 'type.googleapis.com/google.protobuf.Value',
              value: 1.125
              }
          },
          any_value_default: {
            '@type': 'type.googleapis.com/google.protobuf.Any',
            value: { }
          },
          default: { }
        }
      }, out);
    })
  })
});
