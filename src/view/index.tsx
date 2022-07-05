import { IDLParserWrapper, useParser } from 'idl-parser-core'

import { Card, Col, Empty, Row, Space, Typography } from 'antd'
import ButtonTxInstruct from './buttonTxInstruction'

const View = () => {
  const { txInstructions } = useParser()

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} lg={16}>
        <Card bordered={false}>
          <IDLParserWrapper />
        </Card>
      </Col>
      <Col xs={24} lg={8}>
        <Card bordered={false} style={{ height: '100%' }}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Space direction="vertical">
                <Typography.Title level={5}>
                  Transaction Instructions
                </Typography.Title>
                <Typography.Text type="secondary">
                  Send & Confirm the transactions instruction
                </Typography.Text>
              </Space>
            </Col>
            {!!txInstructions && !!Object.keys(txInstructions).length ? (
              Object.keys(txInstructions).map((key, idx) => (
                <Col md={24} lg={12} key={idx}>
                  <ButtonTxInstruct instruct={key} block />
                </Col>
              ))
            ) : (
              <Col span={24} style={{ textAlign: 'center' }}>
                <Empty />
              </Col>
            )}
          </Row>
        </Card>
      </Col>
      <Col span={24} /> {/* Safe sapce */}
    </Row>
  )
}

export default View
