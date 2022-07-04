import { UploadIdl, useParser } from 'idl-parser'

import { Card, Col, Empty, Row, Space, Typography } from 'antd'
import ButtonTxInstruct from './buttonTxInstruction'

const View = () => {
  const { txInstructions } = useParser()

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col md={12} lg={8}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card bordered={false}>
              <UploadIdl />
            </Card>
          </Col>
          <Col span={24}>
            <Card bordered={false}>
              <Row gutter={[24, 24]}>
                <Col span={24}>
                  <Space direction="vertical">
                    <Typography.Title level={5}>
                      Transaction Instructions
                    </Typography.Title>
                    {/* <Typography.Text type="secondary">
                      Explore & install DApps on Senhub, build on Sentre, and
                      send your project to the moon with Sen Suite
                    </Typography.Text> */}
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
        </Row>
      </Col>
    </Row>
  )
}

export default View
